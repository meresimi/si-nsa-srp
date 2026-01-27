import React, { useState, useEffect } from 'react';
import { Users, MapPin, BookOpen, ChevronRight, Plus, Menu, X, Save, Trash2, Download, ArrowLeft, Home, ChevronDown } from 'lucide-react';
import './App.css';

const STORAGE_KEYS = {
  localities: 'sinsa_localities',
  individuals: 'sinsa_individuals',
  childrenClasses: 'sinsa_children_classes',
  juniorYouthGroups: 'sinsa_junior_youth_groups',
  studyCircles: 'sinsa_study_circles'
};

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedRecords, setSavedRecords] = useState({});

  useEffect(() => {
    const loaded = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const data = localStorage.getItem(storageKey);
      loaded[key] = data ? JSON.parse(data) : [];
    });
    setSavedRecords(loaded);
  }, []);

  const saveRecord = (formType, data) => {
    const records = [...(savedRecords[formType] || [])];
    const newRecord = { id: Date.now(), timestamp: new Date().toISOString(), ...data };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
    alert('Record saved successfully!');
  };

  const deleteRecord = (formType, id) => {
    if (!window.confirm('Delete this record?')) return;
    const records = savedRecords[formType].filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(savedRecords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `srp-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const forms = [
    { id: 'localities', name: 'Locality Details', icon: MapPin, color: 'bg-blue-500' },
    { id: 'individuals', name: 'Basic Information', icon: Users, color: 'bg-green-500' },
    { id: 'childrenClasses', name: "Children's Classes", icon: BookOpen, color: 'bg-pink-500' },
    { id: 'juniorYouthGroups', name: 'Junior Youth Groups', icon: Users, color: 'bg-indigo-500' },
    { id: 'studyCircles', name: 'Study Circles', icon: BookOpen, color: 'bg-teal-500' }
  ];

  const DashboardView = () => {
    const totalRecords = Object.values(savedRecords).reduce((sum, records) => sum + records.length, 0);

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">SRP Data Collection</h1>
            <p className="dashboard-subtitle">Systematic Regional Program - Community Building</p>
          </div>
          <button onClick={exportData} className="btn-export">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value text-blue-600">{totalRecords}</div>
            <div className="stat-label">Total Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-green-600">{savedRecords.localities?.length || 0}</div>
            <div className="stat-label">Localities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-purple-600">{savedRecords.individuals?.length || 0}</div>
            <div className="stat-label">Individuals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-orange-600">
              {(savedRecords.childrenClasses?.length || 0) + (savedRecords.juniorYouthGroups?.length || 0) + (savedRecords.studyCircles?.length || 0)}
            </div>
            <div className="stat-label">Activities</div>
          </div>
        </div>

        <div className="forms-grid">
          {forms.map(form => (
            <div key={form.id} onClick={() => setActiveView(form.id)} className="form-card">
              <div className="form-card-header">
                <div className={`form-icon ${form.color}`}>
                  <form.icon className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="form-card-title">{form.name}</h3>
              <p className="form-card-count">{savedRecords[form.id]?.length || 0} records</p>
            </div>
          ))}
        </div>

        <div className="info-banner">
          <h2 className="info-banner-title">Cross-Platform Application</h2>
          <p className="info-banner-text">Works on Android, iOS, and Windows using Capacitor & Electron. All data stored locally.</p>
        </div>
      </div>
    );
  };

  // ... Keep all the form components (LocalityDetailsForm, IndividualsForm, etc.) exactly the same ...

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
          <button 
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeView === 'dashboard' ? 'mobile-nav-item-active' : ''}`}
          >
            <Home className="w-4 h-4" />Dashboard
          </button>
          {forms.map(form => (
            <button 
              key={form.id}
              onClick={() => {
                setActiveView(form.id);
                setMobileMenuOpen(false);
              }}
              className={`mobile-nav-item ${activeView === form.id ? 'mobile-nav-item-active' : ''}`}
            >
              <form.icon className="w-4 h-4" />{form.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

  const renderFormContent = () => {
    const form = forms.find(f => f.id === activeView);
    if (!form) return null;

    return (
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => setActiveView('dashboard')} className="btn-back">
            <ArrowLeft className="w-4 h-4" />Back to Dashboard
          </button>
          <h1 className="page-title">{form.name}</h1>
        </div>

        <div className="page-content">
          {activeView === 'localities' && <LocalityDetailsForm />}
          {activeView === 'individuals' && <IndividualsForm />}
          {activeView === 'childrenClasses' && <ChildrenClassesForm />}
          {activeView === 'juniorYouthGroups' && <JuniorYouthGroupForm />}
          {activeView === 'studyCircles' && <StudyCircleForm />}
        </div>

        <RecordsList formType={activeView} />
      </div>
    );
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
        </div>

        {activeView === 'dashboard' ? <DashboardView /> : renderFormContent()}
      </div>
      
      <MobileMenu />
    </div>
  );
};

export default App;