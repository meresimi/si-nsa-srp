import React from 'react';

const StatsCard = ({ title, value, icon, color, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {value}
          </p>
          <p className="mt-1 text-xs text-gray-500 truncate">
            {description}
          </p>
        </div>
        <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md ${color} text-white`}>
          {icon}
        </div>
      </div>
      
      {/* Progress bar for percentage-based stats */}
      {typeof value === 'string' && value.includes('%') && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color}`}
              style={{ width: value }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Trend indicator for numbers (simplified) */}
      {typeof value === 'number' && !title.includes('%') && (
        <div className="mt-4 flex items-center">
          <svg 
            className={`h-4 w-4 ${parseInt(value) > 0 ? 'text-green-500' : 'text-gray-400'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="ml-1 text-xs font-medium text-gray-600">
            {parseInt(value) > 0 ? 'Active' : 'No data'}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;