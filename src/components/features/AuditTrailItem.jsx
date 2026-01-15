import { formatCurrency, formatDate, getAmountColor, getActionTypeColor } from '../../utils/formatters';

const AuditTrailItem = ({ audit }) => {
  const isPositive = audit.changeAmount > 0;

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Action Type */}
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getActionTypeColor(audit.actionType)}`}>
              {audit.actionType}
            </span>
            {audit.transactionId && (
              <span className="text-xs text-gray-500">
                Txn #{audit.transactionId}
              </span>
            )}
          </div>

          {/* Balance Change */}
          <div className="mb-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{formatCurrency(audit.previousBalance)}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{formatCurrency(audit.newBalance)}</span>
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>By: {audit.initiatedBy}</span>
            <span>•</span>
            <span>{formatDate(audit.createdAt)}</span>
          </div>
        </div>

        {/* Change Amount */}
        <div className="text-right ml-4">
          <p className={`text-lg font-semibold ${getAmountColor(isPositive ? 'CREDIT' : 'DEBIT', audit.changeAmount)}`}>
            {isPositive ? '+' : ''}{formatCurrency(audit.changeAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailItem;
