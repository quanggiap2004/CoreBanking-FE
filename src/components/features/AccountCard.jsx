import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, maskAccountNumber, formatAccountType, getStatusColor } from '../../utils/formatters';
import { BanknotesIcon } from '@heroicons/react/24/outline';

const AccountCard = ({ account }) => {
  const navigate = useNavigate();

  return (
    <Card gradient className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      
      <div className="relative z-10">
        {/* Account Type & Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <BanknotesIcon className="h-5 w-5 text-white opacity-80" />
            <span className="text-sm opacity-90">{formatAccountType(account.accountType)} Account</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(account.status)}`}>
            {account.status}
          </span>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-sm opacity-80 mb-1">Current Balance</p>
          <p className="text-3xl font-bold">{formatCurrency(account.balance)}</p>
        </div>

        {/* Account Number */}
        <div className="mb-4">
          <p className="text-xs opacity-70 font-mono">{maskAccountNumber(account.accountNumber)}</p>
        </div>

        {/* Interest Rate (for savings) */}
        {account.interestRate && (
          <div className="mb-4">
            <p className="text-xs opacity-80">
              Interest Rate: {(account.interestRate * 100).toFixed(2)}% p.a.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/accounts/${account.id}`)}
            className="flex-1 bg-white text-primary-600 hover:bg-gray-100"
          >
            View Details
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/transfer', { state: { sourceAccountNumber: account.accountNumber } })}
            className="flex-1 bg-white bg-opacity-20 text-white hover:bg-opacity-30 border-white border"
          >
            Transfer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;
