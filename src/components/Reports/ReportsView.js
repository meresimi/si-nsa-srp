import React, { useState } from 'react';
import { Plus, ChevronDown, FileText, Download, Eye, BarChart3 } from 'lucide-react';

const ReportsView = ({ savedRecords }) => {
  const [selectedFilter, setSelectedFilter] = useState('General Reports');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['General Reports', 'Institute Report'];

  // Calculate statistics for reports
  const getStatistics = () => {
    return {
      totalIndividuals: savedRecords.individuals?.length || 0,
      totalLocalities: savedRecords.localities?.length || 0,
      totalChildrenClasses: savedRecords.childrenClasses?.length || 0,
      totalJuniorYouthGroups: savedRecords.juniorYouthGroups?.length || 0,
      totalStudyCircles: savedRecords.studyCircles?.length || 0,
      totalActivities: (savedRecords.childrenClasses?.length || 0) + 
                      (savedRecords.juniorYouthGroups?.length || 0) + 
                      (savedRecords.studyCircles?.length || 0)
    };
  };

  const stats = getStatistics();

  const availableReports = [
    {
      id: 'summary',
      title: 'Summary Report',
      description: 'Overview of all localities, individuals, and activities',
      type: 'General',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    {
      id: 'locality',
      title: 'Locality Report',
      description: 'Detailed breakdown by localities and clusters',
      type: 'General',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 'activities',
      title: 'Activities Report',
      description: 'Summary of all core activities',
      type: 'General',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      id: 'institute',
      title: 'Institute Process Report',
      description: 'Study circles and capacity building progress',
      type: 'Institute',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  const getFilteredReports = () => {
    if (selectedFilter === 'General Reports') {
      return availableReports.filter(r => r.type === 'General');
    }
    if (selectedFilter === 'Institute Report') {
      return availableReports.filter(r => r.type === 'Institute');
    }
    return availableReports;
  };

  const filteredReports = getFilteredReports();

  const handleGenerateReport = (reportId) => {
    alert(`Generating ${reportId} report... (Feature to be implemented)`);
  };

  return (
    <div className="view-container">
      {/* Action Bar */}
      <div className="action-bar">
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-create"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>

        {/* Filter Dropdown */}
        <div className="filter-dropdown-container">
          <button 
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="filter-dropdown-button"
          >
            <span>{selectedFilter}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {filterDropdownOpen && (
            <div className="filter-dropdown-menu">
              {filterOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    setFilterDropdownOpen(false);
                  }}
                  className={`filter-dropdown-item ${selectedFilter === option ? 'active' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Form (placeholder) */}
      {showCreateForm && (
        <div className="create-form-section">
          <div className="create-form-header">
            <h3 className="create-form-title">Create Custom Report</h3>
            <button onClick={() => setShowCreateForm(false)} className="btn-close">
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Custom report builder will be implemented here.
          </p>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <FileText className="w-5 h-5" />
            Quick Statistics
          </h2>
        </div>

        <div className="stats-grid-compact">
          <div className="stat-box">
            <div className="stat-value">{stats.totalLocalities}</div>
            <div className="stat-label">Localities</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.totalIndividuals}</div>
            <div className="stat-label">Individuals</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.totalActivities}</div>
            <div className="stat-label">Activities</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.totalStudyCircles}</div>
            <div className="stat-label">Study Circles</div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="content-section mt-6">
        <div className="section-header">
          <h2 className="section-title">
            <BarChart3 className="w-5 h-5" />
            {selectedFilter}
          </h2>
          <span className="section-count">{filteredReports.length} reports</span>
        </div>

        <div className="items-grid">
          {filteredReports.map(report => {
            const IconComponent = report.icon;
            return (
              <div key={report.id} className="item-card">
                <div className="item-card-header">
                  <div className="flex items-center gap-3">
                    <div className={`icon-badge ${report.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="item-card-title">{report.title}</h3>
                      <p className="item-card-subtitle">{report.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="item-card-footer">
                  <button 
                    onClick={() => handleGenerateReport(report.id)}
                    className="btn-secondary-small"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button 
                    onClick={() => handleGenerateReport(report.id)}
                    className="btn-primary-small"
                  >
                    <Download className="w-4 h-4" />
                    Generate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
