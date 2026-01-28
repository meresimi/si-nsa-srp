import React, { useState } from 'react';
import { Plus, ChevronDown, Activity, Edit, Trash2, BookOpen, Users } from 'lucide-react';

const ActivitiesView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Activities');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Activities', "Children's Classes", 'Junior Youth Groups', 'Study Circles'];

  // Get filtered activities based on selected filter
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
      icon: Users,
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
            <h3 className="create-form-title">Create New Activity</h3>
            <button onClick={() => setShowCreateForm(false)} className="btn-close">
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Activity creation form will be implemented here.
          </p>
        </div>
      )}

      {/* Activities List */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <Activity className="w-5 h-5" />
            {selectedFilter}
          </h2>
          <span className="section-count">{filteredActivities.length} activities</span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="empty-state">
            <Activity className="w-12 h-12 text-gray-400 mb-3" />
            <p className="empty-state-title">No activities found</p>
            <p className="empty-state-text">
              Click "Create" to add your first activity
            </p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredActivities.map(activity => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="item-card">
                  <div className="item-card-header">
                    <div className="flex items-center gap-2">
                      <div className={`icon-badge ${activity.color}`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="item-card-title">
                          {activity.name || activity.locality || 'Unnamed Activity'}
                        </h3>
                        <p className="item-card-subtitle">{activity.type}</p>
                      </div>
                    </div>
                    <div className="item-card-actions">
                      <button className="btn-icon" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(getActivityStorageKey(activity), activity.id)}
                        className="btn-icon text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-card-content">
                    {activity.locality && (
                      <div className="item-card-detail">
                        <span className="detail-label">Locality:</span>
                        <span className="detail-value">{activity.locality}</span>
                      </div>
                    )}
                    {activity.startDate && (
                      <div className="item-card-detail">
                        <span className="detail-label">Started:</span>
                        <span className="detail-value">
                          {new Date(activity.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {activity.totalParticipants !== undefined && (
                      <div className="item-card-detail">
                        <span className="detail-label">Participants:</span>
                        <span className="detail-value">{activity.totalParticipants}</span>
                      </div>
                    )}
                    {activity.status && (
                      <div className="item-card-detail">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value">
                          <span className={`status-badge ${activity.status === 'active' ? 'status-active' : 'status-completed'}`}>
                            {activity.status}
                          </span>
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
