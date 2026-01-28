import React, { useState } from 'react';
import { Plus, ChevronDown, Users, Edit, Trash2, User } from 'lucide-react';
import { getAgeCategory } from '../../utils/constants';

const IndividualsView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Individuals');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Individuals', 'Children', 'Junior Youth', 'Youth', 'Adults'];

  // Get filtered individuals based on selected filter
  const getFilteredIndividuals = () => {
    const individuals = savedRecords.individuals || [];
    
    if (selectedFilter === 'All Individuals') {
      return individuals;
    }
    
    return individuals.filter(person => {
      const age = person.age || 0;
      const category = getAgeCategory(age);
      
      switch (selectedFilter) {
        case 'Children':
          return category === 'Child';
        case 'Junior Youth':
          return category === 'Junior Youth';
        case 'Youth':
          return category === 'Youth';
        case 'Adults':
          return category === 'Adult';
        default:
          return true;
      }
    });
  };

  const filteredIndividuals = getFilteredIndividuals();

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
            <h3 className="create-form-title">Create New Individual Record</h3>
            <button onClick={() => setShowCreateForm(false)} className="btn-close">
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Individual creation form will be implemented here.
          </p>
        </div>
      )}

      {/* Individuals List */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <Users className="w-5 h-5" />
            {selectedFilter}
          </h2>
          <span className="section-count">{filteredIndividuals.length} individuals</span>
        </div>

        {filteredIndividuals.length === 0 ? (
          <div className="empty-state">
            <User className="w-12 h-12 text-gray-400 mb-3" />
            <p className="empty-state-title">No individuals found</p>
            <p className="empty-state-text">
              Click "Create" to add your first individual record
            </p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredIndividuals.map(person => (
              <div key={person.id} className="item-card">
                <div className="item-card-header">
                  <div>
                    <h3 className="item-card-title">
                      {person.firstName} {person.familyName || ''}
                    </h3>
                    <p className="item-card-subtitle">
                      {person.age && `Age: ${person.age}`}
                      {person.sex && ` • ${person.sex === 'M' ? 'Male' : 'Female'}`}
                    </p>
                  </div>
                  <div className="item-card-actions">
                    <button className="btn-icon" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete('individuals', person.id)}
                      className="btn-icon text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="item-card-content">
                  {person.age && (
                    <div className="item-card-detail">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">
                        <span className="category-badge">
                          {getAgeCategory(person.age)}
                        </span>
                      </span>
                    </div>
                  )}
                  {person.registered && (
                    <div className="item-card-detail">
                      <span className="detail-label">Registered Bahá'í:</span>
                      <span className="detail-value">{person.registered}</span>
                    </div>
                  )}
                  {person.telephone && (
                    <div className="item-card-detail">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{person.telephone}</span>
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

export default IndividualsView;
