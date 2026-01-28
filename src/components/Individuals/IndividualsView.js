import React, { useState } from 'react';
import { Plus, ChevronDown, Users, Edit, Trash2, User } from 'lucide-react';
import { getAgeCategory } from '../../utils/constants';

const IndividualsView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Individuals');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Individuals', 'Children', 'Junior Youth', 'Youth', 'Adults'];

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
              <div className="form-icon-circle bg-green-500">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="create-form-heading">Create New Individual Record</h3>
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
              Individual creation form will be implemented here.
            </p>
          </div>
        </div>
      )}

      <div className="view-content-card">
        <div className="content-card-header">
          <div className="content-header-left">
            <div className="header-icon-wrapper bg-green-500">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="content-card-title">{selectedFilter}</h2>
              <p className="content-card-subtitle">{filteredIndividuals.length} individual{filteredIndividuals.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
          <div className="content-header-badge">
            <span className="badge-count">{filteredIndividuals.length}</span>
          </div>
        </div>

        {filteredIndividuals.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-icon-circle">
              <User className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="empty-state-heading">No individuals found</h3>
            <p className="empty-state-description">
              Get started by creating your first individual record. Click the "Create" button above to begin.
            </p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="empty-state-action-btn"
            >
              <Plus className="w-5 h-5" />
              Create Individual
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredIndividuals.map(person => (
              <div key={person.id} className="data-card">
                <div className="data-card-header">
                  <div className="data-card-header-left">
                    <div className="card-icon-badge bg-green-500">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="data-card-title">
                        {person.firstName} {person.familyName || ''}
                      </h3>
                      <p className="data-card-subtitle">
                        {person.age && `Age: ${person.age}`}
                        {person.sex && ` • ${person.sex === 'M' ? 'Male' : 'Female'}`}
                      </p>
                    </div>
                  </div>
                  <div className="data-card-actions">
                    <button className="action-btn action-btn-edit" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete('individuals', person.id)}
                      className="action-btn action-btn-delete"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="data-card-body">
                  {person.age && (
                    <div className="data-detail-row">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">
                        <span className="category-badge">
                          {getAgeCategory(person.age)}
                        </span>
                      </span>
                    </div>
                  )}
                  {person.registered && (
                    <div className="data-detail-row">
                      <span className="detail-label">Registered Bahá'í</span>
                      <span className={`detail-badge ${person.registered === 'Y' ? 'badge-success' : 'badge-neutral'}`}>
                        {person.registered === 'Y' ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  {person.telephone && (
                    <div className="data-detail-row">
                      <span className="detail-label">Phone</span>
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
