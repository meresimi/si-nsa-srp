import React, { useState } from 'react';
import { Plus, ChevronDown, Calendar, Edit, Trash2, Clock } from 'lucide-react';

const CyclesView = ({ savedRecords, onSave, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Cycles');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filterOptions = ['All Cycles', 'Latest Cycles'];

  // Placeholder for cycles data (to be implemented in Phase 2)
  const cycles = [];

  const getFilteredCycles = () => {
    if (selectedFilter === 'All Cycles') {
      return cycles;
    }
    
    if (selectedFilter === 'Latest Cycles') {
      // Return cycles from last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return cycles.filter(cycle => new Date(cycle.startDate) >= threeMonthsAgo);
    }
    
    return cycles;
  };

  const filteredCycles = getFilteredCycles();

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
            <h3 className="create-form-title">Create New Cycle</h3>
            <button onClick={() => setShowCreateForm(false)} className="btn-close">
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Cycle creation form will be implemented in Phase 2.
          </p>
        </div>
      )}

      {/* Cycles List */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">
            <Calendar className="w-5 h-5" />
            {selectedFilter}
          </h2>
          <span className="section-count">{filteredCycles.length} cycles</span>
        </div>

        <div className="empty-state">
          <Clock className="w-12 h-12 text-gray-400 mb-3" />
          <p className="empty-state-title">Cycles Feature Coming Soon</p>
          <p className="empty-state-text">
            3-month activity cycles tracking will be available in Phase 2
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
            <h4 className="font-semibold text-blue-900 mb-2">What are Cycles?</h4>
            <p className="text-sm text-blue-800">
              Cycles are 3-month periods used to track community growth and plan activities 
              in the Systematic Regional Program. Each cycle includes planning, execution, 
              and reflection phases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyclesView;
