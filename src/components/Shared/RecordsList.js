import React from 'react';
import { Trash2, Eye } from 'lucide-react';

const RecordsList = ({ title, records, onDelete, onView, emptyMessage }) => {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-4">
        {title} ({records.length})
      </h3>
      
      {records.length === 0 ? (
        <p className="text-gray-500 text-sm">{emptyMessage || 'No records saved yet'}</p>
      ) : (
        <div className="space-y-2">
          {records.map((record) => (
            <div 
              key={record.id} 
              className="bg-white p-3 rounded border flex justify-between items-center hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {new Date(record.timestamp).toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">
                  {record.region || record.cluster || record.locality || record.title || `Record #${record.id}`}
                </p>
              </div>
              
              <div className="flex gap-2">
                {onView && (
                  <button
                    onClick={() => onView(record)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(record.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordsList;