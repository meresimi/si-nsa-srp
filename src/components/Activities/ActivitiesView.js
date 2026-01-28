import React, { useState } from 'react';
import { Plus, ChevronDown, Activity, Edit, Trash2, BookOpen, Users as UsersIcon } from 'lucide-react';

const ActivitiesView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Activities');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Activities', "Children's Classes", 'Junior Youth Groups', 'Study Circles'];

  const getFilteredActivities = () => {
    const childrenClasses = (savedRecords.childrenClasses || []).map(item => ({
      ...item,
      type: "Children's Class",
      icon: BookOpen,
      color: 'bg-blue-500'
    }));
    
    const juniorYouthGroups = (savedRecords.juniorYouthGroups || []).map(item => ({
      ...item,
      type: 'Junior Youth Group',
      icon: UsersIcon,
      color: 'bg-green-500'
    }));
    
    const studyCircles = (savedRecords.studyCircles || []).map(item => ({
      ...item,
      type: 'Study Circle',
      icon: BookOpen,
      color: 'bg-purple-500'
    }));

    const allActivities = [...childrenClasses, ...juniorYouthGroups, ...studyCircles];
    
    if (selectedFilter === 'All Activities') {
      return allActivities;
    }
    
    return allActivities.filter(activity => {
      if (selectedFilter === "Children's Classes") return activity.type === "Children's Class";
      if (selectedFilter === 'Junior Youth Groups') return activity.type === 'Junior Youth Group';
      if (selectedFilter === 'Study Circles') return activity.type === 'Study Circle';
      return true;
    });
  };

  const filteredActivities = getFilteredActivities();

  const getActivityStorageKey = (activity) => {
    if (activity.type === "Children's Class") return 'childrenClasses';
    if (activity.type === 'Junior Youth Group') return 'juniorYouthGroups';
    if (activity.type === 'Study Circle') return 'studyCircles';
    return 'activities';
  };

  return (
    <div className="view-container">
      <div className="view-action-bar">
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-create-new"
        >
          <Plus className="w-5 h-5" />
          <span>Create</span>
        </button>

        <div className="filter-dropdown-wrapper">
          <button 
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="filter-button-main"
          >
            <span className="filter-button-text">{selectedFilter}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {filterDropdownOpen && (
            <>
              <div 
                className="dropdown-overlay"
                onClick={() => setFilterDropdownOpen(false)}
              />
              <div className="filter-dropdown-list">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setFilterDropdownOpen(false);
                    }}
                    className={`filter-option-item ${selectedFilter === option ? 'selected' : ''}`}
                  >
                    <span>{option}</span>
                    {selectedFilter === option && (
                      <div className="selected-indicator"></div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {showCreateForm && (
        <div className="create-form-card">
          <div className="create-form-header-bar">
            <div className="create-form-icon-title">
              <div className="form-icon-circle bg-purple-500">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="create-form-heading">Create New Activity</h3>
            </div>
            <button 
              onClick={() => setShowCreateForm(false)} 
              className="form-close-btn"
            >
              ×
            </button>
          </div>
          <div className="create-form-body">
            <p className="form-placeholder-text">
              Activity creation form will be implemented here.
            </p>
          </div>
        </div>
      )}

      <div className="view-content-card">
        <div className="content-card-header">
          <div className="content-header-left">
            <div className="header-icon-wrapper bg-purple-500">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="content-card-title">{selectedFilter}</h2>
              <p className="content-card-subtitle">{filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'} found</p>
            </div>
          </div>
          <div className="content-header-badge">
            <span className="badge-count">{filteredActivities.length}</span>
          </div>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-icon-circle">
              <Activity className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="empty-state-heading">No activities found</h3>
            <p className="empty-state-description">
              Get started by creating your first activity record. Click the "Create" button above to begin.
            </p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="empty-state-action-btn"
            >
              <Plus className="w-5 h-5" />
              Create Activity
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredActivities.map(activity => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="data-card">
                  <div className="data-card-header">
                    <div className="data-card-header-left">
                      <div className={`card-icon-badge ${activity.color}`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="data-card-title">
                          {activity.name || activity.locality || 'Unnamed Activity'}
                        </h3>
                        <p className="data-card-subtitle">{activity.type}</p>
                      </div>
                    </div>
                    <div className="data-card-actions">
                      <button className="action-btn action-btn-edit" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(getActivityStorageKey(activity), activity.id)}
                        className="action-btn action-btn-delete"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="data-card-body">
                    {activity.locality && (
                      <div className="data-detail-row">
                        <span className="detail-label">Locality</span>
                        <span className="detail-value">{activity.locality}</span>
                      </div>
                    )}
                    {activity.startDate && (
                      <div className="data-detail-row">
                        <span className="detail-label">Started</span>
                        <span className="detail-value">
                          {new Date(activity.startDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                    {activity.totalParticipants !== undefined && (
                      <div className="data-detail-row">
                        <span className="detail-label">Participants</span>
                        <span className="detail-value">{activity.totalParticipants}</span>
                      </div>
                    )}
                    {activity.status && (
                      <div className="data-detail-row">
                        <span className="detail-label">Status</span>
                        <span className={`status-badge ${activity.status === 'active' || !activity.status ? 'status-active' : 'status-completed'}`}>
                          {activity.status || 'Active'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesView;
