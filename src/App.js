import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Menu, 
  X, 
  Download, 
  Home,
  Activity,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import './App.css';

// Import components
import Dashboard from './components/Dashboard/Dashboard';
import LocationsView from './components/Locations/LocationsView';
import IndividualsView from './components/Individuals/IndividualsView';
import ActivitiesView from './components/Activities/ActivitiesView';
import CyclesView from './components/Cycles/CyclesView';
import ReportsView from './components/Reports/ReportsView';
import ToolsView from './components/Tools/ToolsView';

// Import utilities
import { STORAGE_KEYS } from './utils/constants';
import { getAllRecords } from './utils/storage';
import { exportAllData } from './utils/exportData';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedRecords, setSavedRecords] = useState({});

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const loaded = {
      localities: getAllRecords(STORAGE_KEYS.localities),
      individuals: getAllRecords(STORAGE_KEYS.individuals),
      childrenClasses: getAllRecords(STORAGE_KEYS.childrenClasses),
      juniorYouthGroups: getAllRecords(STORAGE_KEYS.juniorYouthGroups),
      studyCircles: getAllRecords(STORAGE_KEYS.studyCircles)
    };
    setSavedRecords(loaded);
  };

  const saveRecord = (formType, data) => {
    const records = [...(savedRecords[formType] || [])];
    const newRecord = { 
      id: Date.now(), 
      timestamp: new Date().toISOString(), 
      ...data 
    };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
    alert('Record saved successfully!');
    loadAllData();
  };

  const deleteRecord = (formType, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    const records = savedRecords[formType].filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
    loadAllData();
  };

  const handleExportData = () => {
    try {
      exportAllData();
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  // Updated navigation items
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'locations', name: 'Locations', icon: MapPin },
    { id: 'individuals', name: 'Individuals', icon: Users },
    { id: 'activities', name: 'Activities', icon: Activity },
    { id: 'cycles', name: 'Cycles', icon: Calendar },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'tools', name: 'Tools', icon: Settings }
  ];

  const MobileMenu = () => {
    if (!mobileMenuOpen) return null;

    return (
      <div className="mobile-menu">
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h3 className="mobile-menu-title">SI-NSA SRP</h3>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-menu-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="mobile-nav">
            {navigationItems.map(item => (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-nav-item ${activeView === item.id ? 'mobile-nav-item-active' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'locations':
        return (
          <LocationsView 
            savedRecords={savedRecords}
            onSave={saveRecord}
            onDelete={deleteRecord}
          />
        );
      case 'individuals':
        return (
          <IndividualsView 
            savedRecords={savedRecords}
            onSave={saveRecord}
            onDelete={deleteRecord}
          />
        );
      case 'activities':
        return (
          <ActivitiesView 
            savedRecords={savedRecords}
            onSave={saveRecord}
            onDelete={deleteRecord}
          />
        );
      case 'cycles':
        return (
          <CyclesView 
            savedRecords={savedRecords}
            onSave={saveRecord}
            onDelete={deleteRecord}
          />
        );
      case 'reports':
        return (
          <ReportsView 
            savedRecords={savedRecords}
          />
        );
      case 'tools':
        return (
          <ToolsView 
            savedRecords={savedRecords}
            onExport={handleExportData}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-toggle"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="header-title">SI-NSA SRP Data Collection</h1>
          <button onClick={handleExportData} className="btn-export-header">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {renderView()}
      </div>
      
      <MobileMenu />
    </div>
  );
};

export default App;
