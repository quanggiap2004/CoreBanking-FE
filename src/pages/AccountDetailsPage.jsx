import { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import toast from 'react-hot-toast';
import { getAccountDetails, getAccountAuditTrail } from '../services/accountService';
import { formatCurrency, formatDate, maskAccountNumber, formatAccountType, getStatusColor, copyToClipboard } from '../utils/formatters';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AuditTrailItem from '../components/features/AuditTrailItem';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { ArrowLeftIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const AccountDetailsPage = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [auditTrail, setAuditTrail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchAccountData();
  }, [accountId]);

  const fetchAccountData = async () => {
    try {
      const [accountData, auditData] = await Promise.all([
        getAccountDetails(accountId),
        getAccountAuditTrail(accountId),
      ]);
      
      setAccount(accountData);
      setAuditTrail(auditData);
    } catch (error) {
      console.error('Failed to fetch account data:', error);
      toast.error('Failed to load account details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(account.accountNumber);
    if (success) {
      setCopied(true);
      toast.success('Account number copied!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSkeleton type="card" />
        </main>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Not Found</h2>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Button>

        {/* Account Info Card */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Number</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-mono font-medium text-gray-900">
                      {account.accountNumber}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {copied ? (
                        <CheckIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Type</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatAccountType(account.accountType)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(account.status)}`}>
                    {account.status}
                  </span>
                </div>

                {account.interestRate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                    <p className="text-lg font-medium text-gray-900">
                      {(account.interestRate * 100).toFixed(2)}% per annum
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Created On</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatDate(account.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Balance */}
            <div className="bg-gradient-blue rounded-xl p-6 text-white flex flex-col justify-center">
              <p className="text-sm opacity-80 mb-2">Current Balance</p>
              <p className="text-4xl font-bold mb-4">{formatCurrency(account.balance)}</p>
              <p className="text-xs opacity-70 font-mono">{maskAccountNumber(account.accountNumber)}</p>
            </div>
          </div>
        </Card>

        {/* Tabs for Transactions and Audit Trail */}
        <Card>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white text-primary-700 shadow'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                    )}
                  >
                    Audit Trail
                  </button>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Audit Trail Tab */}
              <Tab.Panel>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Audit Trail</h3>
                
                {auditTrail.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No audit records found</p>
                  </div>
                ) : (
                  <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                    {auditTrail.map((audit) => (
                      <AuditTrailItem key={audit.id} audit={audit} />
                    ))}
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Card>
      </main>
    </div>
  );
};

export default AccountDetailsPage;
