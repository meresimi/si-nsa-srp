import React, { useState } from 'react';
import { Plus, ChevronDown, MapPin, Edit, Trash2, Map } from 'lucide-react';

const LocationsView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('Solomon Islands');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['Solomon Islands', 'Regional', 'Cluster', 'Locality', 'Focus Neighbourhoods'];

  const getFilteredLocations = () => {
    const locations = savedRecords.localities || [];
    
    if (selectedFilter === 'Solomon Islands') {
      return locations;
    }
    
    return locations.filter(loc => loc.type === selectedFilter.toLowerCase());
  };

  const filteredLocations = getFilteredLocations();

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
              <div className="form-icon-circle bg-blue-500">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="create-form-heading">Create New Location</h3>
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
              Location creation form will be implemented here.
            </p>
          </div>
        </div>
      )}

      <div className="view-content-card">
        <div className="content-card-header">
          <div className="content-header-left">
            <div className="header-icon-wrapper bg-blue-500">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="content-card-title">{selectedFilter}</h2>
              <p className="content-card-subtitle">{filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
          <div className="content-header-badge">
            <span className="badge-count">{filteredLocations.length}</span>
          </div>
        </div>

        {filteredLocations.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-icon-circle">
              <Map className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="empty-state-heading">No locations found</h3>
            <p className="empty-state-description">
              Get started by creating your first location record. Click the "Create" button above to begin.
            </p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="empty-state-action-btn"
            >
              <Plus className="w-5 h-5" />
              Create Location
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredLocations.map(location => (
              <div key={location.id} className="data-card">
                <div className="data-card-header">
                  <div className="data-card-header-left">
                    <div className="card-icon-badge bg-blue-500">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="data-card-title">{location.locality || 'Unnamed Location'}</h3>
                      <p className="data-card-subtitle">
                        {location.cluster && `Cluster: ${location.cluster}`}
                        {location.region && location.cluster && ' • '}
                        {location.region && `Region: ${location.region}`}
                      </p>
                    </div>
                  </div>
                  <div className="data-card-actions">
                    <button className="action-btn action-btn-edit" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete('localities', location.id)}
                      className="action-btn action-btn-delete"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="data-card-body">
                  <div className="data-detail-row">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">
                      {location.date ? new Date(location.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : 'Not specified'}
                    </span>
                  </div>
                  {location.focusNeighbourhoods && (
                    <div className="data-detail-row">
                      <span className="detail-label">Focus Neighbourhoods</span>
                      <span className="detail-value">{location.focusNeighbourhoods}</span>
                    </div>
                  )}
                  {location.hasLSA && (
                    <div className="data-detail-row">
                      <span className="detail-label">Has LSA</span>
                      <span className={`detail-badge ${location.hasLSA === 'Yes' ? 'badge-success' : 'badge-neutral'}`}>
                        {location.hasLSA}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsView;
