import React, { useState } from 'react';
import { Plus, ChevronDown, Calendar, Clock } from 'lucide-react';

const CyclesView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Cycles');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Cycles', 'Latest Cycles'];
  const cycles = []; // Placeholder for Phase 2

  return (
    <div className="view-container">
      <div className="view-action-bar">
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn-create-new">
          <Plus className="w-5 h-5" />
          <span>Create</span>
        </button>

        <div className="filter-dropdown-wrapper">
          <button onClick={() => setFilterDropdownOpen(!filterDropdownOpen)} className="filter-button-main">
            <span className="filter-button-text">{selectedFilter}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {filterDropdownOpen && (
            <>
              <div className="dropdown-overlay" onClick={() => setFilterDropdownOpen(false)} />
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
                    {selectedFilter === option && <div className="selected-indicator"></div>}
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
              <div className="form-icon-circle bg-orange-500">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="create-form-heading">Create New Cycle</h3>
            </div>
            <button onClick={() => setShowCreateForm(false)} className="form-close-btn">×</button>
          </div>
          <div className="create-form-body">
            <p className="form-placeholder-text">Cycle creation form will be implemented in Phase 2.</p>
          </div>
        </div>
      )}

      <div className="view-content-card">
        <div className="content-card-header">
          <div className="content-header-left">
            <div className="header-icon-wrapper bg-orange-500">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="content-card-title">{selectedFilter}</h2>
              <p className="content-card-subtitle">{cycles.length} cycles found</p>
            </div>
          </div>
          <div className="content-header-badge">
            <span className="badge-count">{cycles.length}</span>
          </div>
        </div>

        <div className="empty-state-container">
          <div className="empty-state-icon-circle">
            <Clock className="w-16 h-16 text-gray-300" />
          </div>
          <h3 className="empty-state-heading">Cycles Feature Coming Soon</h3>
          <p className="empty-state-description">
            3-month activity cycles tracking will be available in Phase 2. This feature will help you plan and track community growth across quarterly program cycles in the Systematic Regional Program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CyclesView;
