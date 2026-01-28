import React, { useState } from 'react';
import { Plus, ChevronDown, MapPin, Edit, Trash2 } from 'lucide-react';

const LocationsView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('Solomon Islands');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['Solomon Islands', 'Regional', 'Cluster', 'Locality', 'Focus Neighbourhoods'];

  // Get filtered locations based on selected filter
  const getFilteredLocations = () => {
    const locations = savedRecords.localities || [];
    
    if (selectedFilter === 'Solomon Islands') {
      return locations; // Show all
    }
    
    // Filter by type when implemented
    return locations.filter(loc => loc.type === selectedFilter.toLowerCase());
  };

  const filteredLocations = getFilteredLocations();

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
            <h3 className="create-form-title">Create New Location</h3>
            <button onClick={() => setShowCreateForm(false)} className="btn-close">
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Location creation form will be implemented here.
          </p>
        </div>
      )}

      {/* Locations List */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <MapPin className="w-5 h-5" />
            {selectedFilter}
          </h2>
          <span className="section-count">{filteredLocations.length} locations</span>
        </div>

        {filteredLocations.length === 0 ? (
          <div className="empty-state">
            <MapPin className="w-12 h-12 text-gray-400 mb-3" />
            <p className="empty-state-title">No locations found</p>
            <p className="empty-state-text">
              Click "Create" to add your first location
            </p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredLocations.map(location => (
              <div key={location.id} className="item-card">
                <div className="item-card-header">
                  <div>
                    <h3 className="item-card-title">{location.locality || 'Unnamed Location'}</h3>
                    <p className="item-card-subtitle">
                      {location.cluster && `Cluster: ${location.cluster}`}
                      {location.region && ` • Region: ${location.region}`}
                    </p>
                  </div>
                  <div className="item-card-actions">
                    <button className="btn-icon" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete('localities', location.id)}
                      className="btn-icon text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="item-card-content">
                  <div className="item-card-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {location.date ? new Date(location.date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  {location.focusNeighbourhoods && (
                    <div className="item-card-detail">
                      <span className="detail-label">Focus Neighbourhoods:</span>
                      <span className="detail-value">{location.focusNeighbourhoods}</span>
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
