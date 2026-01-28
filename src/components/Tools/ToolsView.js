import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  Trash2, 
  Settings, 
  Database,
  FileJson,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ToolsView = ({ savedRecords, onExport }) => {
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);

  const calculateStorageSize = () => {
    let totalSize = 0;
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
    } catch (e) {
      console.error('Error calculating storage:', e);
    }
    return (totalSize / 1024).toFixed(2); // Convert to KB
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            // Implement import logic
            alert('Data import feature will be implemented soon');
            console.log('Imported data:', data);
          } catch (error) {
            alert('Invalid JSON file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAllData = () => {
    if (showClearDataConfirm) {
      // Clear all SRP data from localStorage
      const srpKeys = Object.values(savedRecords);
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sinsa_')) {
          localStorage.removeItem(key);
        }
      });
      alert('All data cleared successfully');
      setShowClearDataConfirm(false);
      window.location.reload();
    } else {
      setShowClearDataConfirm(true);
    }
  };

  const tools = [
    {
      id: 'export-json',
      title: 'Export Data (JSON)',
      description: 'Download all your data in JSON format for backup',
      icon: FileJson,
      color: 'bg-blue-500',
      action: onExport
    },
    {
      id: 'export-csv',
      title: 'Export Data (CSV)',
      description: 'Download data in CSV format for spreadsheets',
      icon: FileSpreadsheet,
      color: 'bg-green-500',
      action: () => alert('CSV export feature will be implemented soon')
    },
    {
      id: 'import',
      title: 'Import Data',
      description: 'Import data from a previous export',
      icon: Upload,
      color: 'bg-purple-500',
      action: handleImportData
    },
    {
      id: 'clear-data',
      title: 'Clear All Data',
      description: 'Delete all stored data (cannot be undone)',
      icon: Trash2,
      color: 'bg-red-500',
      action: handleClearAllData,
      dangerous: true
    }
  ];

  const statistics = {
    totalRecords: (savedRecords.localities?.length || 0) +
                  (savedRecords.individuals?.length || 0) +
                  (savedRecords.childrenClasses?.length || 0) +
                  (savedRecords.juniorYouthGroups?.length || 0) +
                  (savedRecords.studyCircles?.length || 0),
    storageUsed: calculateStorageSize(),
    lastExport: localStorage.getItem('lastExportDate') || 'Never'
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <Settings className="w-5 h-5" />
            Tools & Settings
          </h2>
        </div>

        {/* Storage Statistics */}
        <div className="stats-grid-compact mb-6">
          <div className="stat-box">
            <div className="stat-value">{statistics.totalRecords}</div>
            <div className="stat-label">Total Records</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{statistics.storageUsed} KB</div>
            <div className="stat-label">Storage Used</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{statistics.lastExport}</div>
            <div className="stat-label">Last Export</div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="info-banner-warning mb-6">
          <AlertCircle className="w-5 h-5" />
          <div>
            <h4 className="font-semibold">Data Storage Notice</h4>
            <p className="text-sm mt-1">
              All data is stored locally on your device. Regular backups are recommended 
              to prevent data loss. Use the export tools below to save your data.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="tools-grid">
          {tools.map(tool => {
            const IconComponent = tool.icon;
            return (
              <div 
                key={tool.id} 
                className={`tool-card ${tool.dangerous ? 'tool-card-danger' : ''}`}
              >
                <div className="tool-card-header">
                  <div className={`icon-badge ${tool.color}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="tool-card-title">{tool.title}</h3>
                </div>
                
                <p className="tool-card-description">{tool.description}</p>
                
                <button 
                  onClick={tool.action}
                  className={`btn-tool ${tool.dangerous ? 'btn-tool-danger' : ''}`}
                >
                  {tool.dangerous && showClearDataConfirm && tool.id === 'clear-data' 
                    ? 'Click again to confirm'
                    : 'Execute'
                  }
                </button>
              </div>
            );
          })}
        </div>

        {/* Application Info */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Application Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Version:</span>
              <span className="ml-2 text-gray-600">1.0.0</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Platform:</span>
              <span className="ml-2 text-gray-600">
                {navigator.platform || 'Web'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Browser:</span>
              <span className="ml-2 text-gray-600">
                {navigator.userAgent.split(' ').pop()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Data Format:</span>
              <span className="ml-2 text-gray-600">SRP 3.1</span>
            </div>
          </div>
        </div>

        {/* Backup Recommendations */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Backup Recommendations</h4>
              <ul className="text-sm text-green-800 mt-2 space-y-1 list-disc list-inside">
                <li>Export your data at least once a week</li>
                <li>Keep backups in multiple locations (cloud storage, USB drive)</li>
                <li>Test your backups by importing them into a test environment</li>
                <li>Before clearing data, ensure you have a recent export</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
