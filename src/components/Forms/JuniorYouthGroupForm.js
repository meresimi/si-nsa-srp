import React, { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Users, 
  Calendar, 
  BookOpen, 
  UserPlus, 
  UserMinus,
  ChevronRight,
  Sparkles,
  Clock,
  TrendingUp
} from 'lucide-react';
import FormField from '../Shared/FormField';

const JuniorYouthGroupForm = ({ 
  initialData = {}, 
  localities = [], 
  individuals = [], 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: initialData.name || '',
    locality: initialData.locality || '',
    focusNeighbourhood: initialData.focusNeighbourhood || '',
    startDate: initialData.startDate || new Date().toISOString().split('T')[0],
    endDate: initialData.endDate || '',
    
    // Animators/Facilitators
    animators: initialData.animators || [],
    
    // Current Book Information
    currentBook: initialData.currentBook || 'Breezes of Confirmation',
    bookStartDate: initialData.bookStartDate || initialData.startDate || new Date().toISOString().split('T')[0],
    
    // Completed Books History
    completedBooks: initialData.completedBooks || [],
    
    // Participants Information
    participants: initialData.participants || [],
    totalParticipants: initialData.totalParticipants || 0,
    bahaiParticipants: initialData.bahaiParticipants || 0,
    
    // Group Characteristics
    groupType: initialData.groupType || 'regular', // regular, school-based, community-based
    hasServiceProjects: initialData.hasServiceProjects || false,
    serviceProjectDescription: initialData.serviceProjectDescription || '',
    
    // Status
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    status: initialData.status || 'active', // active, completed, suspended
    
    // Meeting Information
    meetingFrequency: initialData.meetingFrequency || 'weekly',
    meetingDay: initialData.meetingDay || '',
    meetingTime: initialData.meetingTime || '',
    location: initialData.location || '',
    
    // Additional Information
    notes: initialData.notes || '',
    challenges: initialData.challenges || '',
    achievements: initialData.achievements || '',
    
    // Timestamps
    createdAt: initialData.createdAt || new Date().toISOString(),
    lastUpdated: initialData.lastUpdated || new Date().toISOString(),
  });

  const [availableFocusNeighbourhoods, setAvailableFocusNeighbourhoods] = useState([]);
  const [availableAnimators, setAvailableAnimators] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);
  
  // Junior Youth Books sequence (from Reference Guide 2.4.2)
  const juniorYouthBooks = [
    'Breezes of Confirmation',
    'Glimmerings of Hope',
    'Walking the Straight Path',
    'Learning About Excellence',
    'The Human Temple',
    'Spirit of Faith',
    'Matter and Spirit'
  ];

  const meetingFrequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'irregular', label: 'Irregular' }
  ];

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const groupTypes = [
    { value: 'regular', label: 'Regular Junior Youth Group' },
    { value: 'school_based', label: 'School-based Group' },
    { value: 'community_based', label: 'Community-based Group' },
    { value: 'village', label: 'Village Group' },
    { value: 'neighborhood', label: 'Neighborhood Group' }
  ];

  // Filter available individuals based on age category (junior youth: 12-14 years)
  useEffect(() => {
    const juniorYouth = individuals.filter(ind => 
      ind.ageCategory === 'junior_youth'
    );
    setAvailableParticipants(juniorYouth);
    
    // Animators can be youth or adults who have completed Book 5
    const potentialAnimators = individuals.filter(ind => 
      (ind.ageCategory === 'youth' || ind.ageCategory === 'adult') &&
      ind.completedRuhiBooks?.includes('book5') // Book 5: Releasing the Powers of Junior Youth
    );
    setAvailableAnimators(potentialAnimators);
  }, [individuals]);

  // Update focus neighbourhoods when locality changes
  useEffect(() => {
    if (formData.locality) {
      const selectedLocality = localities.find(loc => 
        loc.id === formData.locality || loc.name === formData.locality
      );
      if (selectedLocality) {
        setAvailableFocusNeighbourhoods(selectedLocality.focusNeighbourhoods || []);
      } else {
        setAvailableFocusNeighbourhoods([]);
      }
    } else {
      setAvailableFocusNeighbourhoods([]);
    }
  }, [formData.locality, localities]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };

    // If status changes to completed, set end date if not already set
    if (name === 'status' && value === 'completed' && !formData.endDate) {
      updatedData.endDate = new Date().toISOString().split('T')[0];
      updatedData.isActive = false;
    } else if (name === 'status' && value === 'active') {
      updatedData.isActive = true;
      updatedData.endDate = '';
    }

    // Clear service project description if checkbox is unchecked
    if (name === 'hasServiceProjects' && !checked) {
      updatedData.serviceProjectDescription = '';
    }

    setFormData(updatedData);
  };

  const handleAddAnimator = (animatorId) => {
    if (!formData.animators.includes(animatorId)) {
      setFormData(prev => ({
        ...prev,
        animators: [...prev.animators, animatorId]
      }));
    }
  };

  const handleRemoveAnimator = (animatorId) => {
    setFormData(prev => ({
      ...prev,
      animators: prev.animators.filter(id => id !== animatorId)
    }));
  };

  const handleAddParticipant = (participantId) => {
    if (!formData.participants.includes(participantId)) {
      const participant = individuals.find(ind => ind.id === participantId);
      const isBahai = participant?.isRegisteredBahai || participant?.isFromBahaiFamily;
      
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantId],
        totalParticipants: prev.totalParticipants + 1,
        bahaiParticipants: isBahai ? prev.bahaiParticipants + 1 : prev.bahaiParticipants
      }));
    }
  };

  const handleRemoveParticipant = (participantId) => {
    const participant = individuals.find(ind => ind.id === participantId);
    const isBahai = participant?.isRegisteredBahai || participant?.isFromBahaiFamily;
    
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(id => id !== participantId),
      totalParticipants: prev.totalParticipants - 1,
      bahaiParticipants: isBahai ? prev.bahaiParticipants - 1 : prev.bahaiParticipants
    }));
  };

  const handleMarkBookCompleted = () => {
    if (!formData.currentBook) return;

    const completedBook = {
      book: formData.currentBook,
      startDate: formData.bookStartDate,
      endDate: new Date().toISOString().split('T')[0],
      animators: formData.animators,
      participants: formData.participants,
      serviceProjects: formData.hasServiceProjects ? formData.serviceProjectDescription : ''
    };

    // Find next book in sequence
    const currentIndex = juniorYouthBooks.indexOf(formData.currentBook);
    const nextBook = currentIndex < juniorYouthBooks.length - 1 ? juniorYouthBooks[currentIndex + 1] : null;

    setFormData(prev => ({
      ...prev,
      completedBooks: [...prev.completedBooks, completedBook],
      currentBook: nextBook || '',
      bookStartDate: nextBook ? new Date().toISOString().split('T')[0] : '',
      status: nextBook ? 'active' : 'completed',
      isActive: !!nextBook,
      endDate: !nextBook ? new Date().toISOString().split('T')[0] : prev.endDate,
      hasServiceProjects: false,
      serviceProjectDescription: ''
    }));
  };

  const handleRemoveCompletedBook = (index) => {
    const updatedCompletedBooks = [...formData.completedBooks];
    const removedBook = updatedCompletedBooks.splice(index, 1)[0];
    
    // If removing the most recent completed book, set it as current
    if (index === updatedCompletedBooks.length) {
      setFormData(prev => ({
        ...prev,
        completedBooks: updatedCompletedBooks,
        currentBook: removedBook.book,
        bookStartDate: removedBook.startDate,
        status: 'active',
        isActive: true,
        endDate: '',
        hasServiceProjects: !!removedBook.serviceProjects,
        serviceProjectDescription: removedBook.serviceProjects || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        completedBooks: updatedCompletedBooks
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      lastUpdated: new Date().toISOString(),
      // Auto-calculate totals if not manually set
      totalParticipants: formData.totalParticipants || formData.participants.length,
      bahaiParticipants: formData.bahaiParticipants || 
        formData.participants.filter(pid => {
          const participant = individuals.find(ind => ind.id === pid);
          return participant?.isRegisteredBahai || participant?.isFromBahaiFamily;
        }).length
    };
    onSave(dataToSave);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-orange-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData.id ? 'Edit Junior Youth Group' : 'New Junior Youth Group'}
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Group Name (Optional)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Sunshine Junior Youth Group"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Locality *
              </label>
              <select
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select locality</option>
                {localities.map(locality => (
                  <option key={locality.id || locality.name} value={locality.id || locality.name}>
                    {locality.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Focus Neighbourhood (Optional)
              </label>
              <select
                name="focusNeighbourhood"
                value={formData.focusNeighbourhood}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={!formData.locality || availableFocusNeighbourhoods.length === 0}
              >
                <option value="">Select focus neighbourhood</option>
                {availableFocusNeighbourhoods.map(neighbourhood => (
                  <option key={neighbourhood} value={neighbourhood}>
                    {neighbourhood}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Type
              </label>
              <select
                name="groupType"
                value={formData.groupType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {groupTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                label="Start Date *"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              
              <FormField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.status === 'active'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Frequency
              </label>
              <select
                name="meetingFrequency"
                value={formData.meetingFrequency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {meetingFrequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Day (Optional)
              </label>
              <select
                name="meetingDay"
                value={formData.meetingDay}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select day</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Meeting Time (Optional)"
              name="meetingTime"
              type="time"
              value={formData.meetingTime}
              onChange={handleChange}
            />

            <FormField
              label="Location (Optional)"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Community Center, School, Home"
            />
          </div>
        </div>

        {/* Book Information Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Book Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Current Book */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Current Book
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Book *
                </label>
                <select
                  name="currentBook"
                  value={formData.currentBook}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select current book</option>
                  {juniorYouthBooks.map(book => (
                    <option key={book} value={book}>
                      {book}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Book Start Date *"
                name="bookStartDate"
                type="date"
                value={formData.bookStartDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Service Projects Checkbox */}
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasServiceProjects"
                  name="hasServiceProjects"
                  checked={formData.hasServiceProjects}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="hasServiceProjects" className="ml-2 text-sm font-medium text-gray-700">
                  This group is engaged in service projects
                </label>
              </div>
              
              {formData.hasServiceProjects && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Project Description
                  </label>
                  <textarea
                    name="serviceProjectDescription"
                    value={formData.serviceProjectDescription}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe the service projects the group is involved in..."
                  />
                </div>
              )}
            </div>

            {formData.currentBook && formData.status === 'active' && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleMarkBookCompleted}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Mark "{formData.currentBook}" as Completed
                </button>
                <p className="text-sm text-gray-500 mt-1">
                  This will move the current book to completed books and allow you to start the next book.
                </p>
              </div>
            )}
          </div>

          {/* Completed Books History */}
          {formData.completedBooks.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Completed Books</h4>
              <div className="space-y-3">
                {formData.completedBooks.map((book, index) => (
                  <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">{book.book}</span>
                          <span className="text-sm text-gray-500 ml-3">
                            {book.startDate} to {book.endDate}
                          </span>
                        </div>
                        {book.serviceProjects && (
                          <div className="mt-2">
                            <span className="text-sm font-medium text-green-600">Service Projects: </span>
                            <span className="text-sm text-gray-600">{book.serviceProjects}</span>
                          </div>
                        )}
                        <div className="text-sm text-gray-500 mt-1">
                          {book.participants?.length || 0} participants
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompletedBook(index)}
                        className="text-red-600 hover:text-red-800 text-sm ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Animators Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Animators
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Animators should be youth or adults who have completed Book 5 of the Ruhi Institute.
            </p>
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddAnimator(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Select animator...</option>
                {availableAnimators.map(animator => (
                  <option key={animator.id} value={animator.id}>
                    {animator.firstName} {animator.familyName} 
                    {animator.completedRuhiBooks?.includes('book5') ? ' (Book 5 completed)' : ''}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  const select = document.querySelector('select');
                  if (select.value) {
                    handleAddAnimator(select.value);
                    select.value = '';
                  }
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Selected Animators */}
          {formData.animators.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Selected Animators:</h4>
              {formData.animators.map(animatorId => {
                const animator = individuals.find(ind => ind.id === animatorId);
                return animator ? (
                  <div key={animatorId} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                    <div>
                      <span className="font-medium">{animator.firstName} {animator.familyName}</span>
                      <span className="text-sm text-gray-500 ml-2">({animator.ageCategory})</span>
                      {animator.completedRuhiBooks?.includes('book5') && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Book 5 Completed
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAnimator(animatorId)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Participants Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Participants (Junior Youth: 12-14 years)
            </h3>
            <div className="text-sm text-gray-600">
              Total: {formData.totalParticipants} | Bahá'í: {formData.bahaiParticipants}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddParticipant(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Select junior youth participant...</option>
                {availableParticipants.map(participant => (
                  <option key={participant.id} value={participant.id}>
                    {participant.firstName} {participant.familyName} 
                    {participant.isRegisteredBahai ? ' (Bahá\'í)' : ''}
                    {participant.completedJuniorYouthBooks?.length > 0 ? 
                      ` (${participant.completedJuniorYouthBooks.length} books completed)` : ''}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  const select = document.querySelectorAll('select')[1];
                  if (select?.value) {
                    handleAddParticipant(select.value);
                    select.value = '';
                  }
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Manual Counts (if participants not individually listed) */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Total Participants (if not individually listed)"
              name="totalParticipants"
              type="number"
              min="0"
              value={formData.totalParticipants}
              onChange={handleChange}
            />
            
            <FormField
              label="Bahá'í Participants (if not individually listed)"
              name="bahaiParticipants"
              type="number"
              min="0"
              max={formData.totalParticipants}
              value={formData.bahaiParticipants}
              onChange={handleChange}
            />
          </div>

          {/* Selected Participants */}
          {formData.participants.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Selected Participants:</h4>
              {formData.participants.map(participantId => {
                const participant = individuals.find(ind => ind.id === participantId);
                return participant ? (
                  <div key={participantId} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{participant.firstName} {participant.familyName}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          Age: {participant.estimatedAge || 'N/A'} | 
                          {participant.isRegisteredBahai ? ' Bahá\'í' : ' Not Bahá\'í'}
                        </span>
                      </div>
                      {participant.completedJuniorYouthBooks?.length > 0 && (
                        <div className="text-xs text-blue-600 mt-1">
                          Books completed: {participant.completedJuniorYouthBooks.join(', ')}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(participantId)}
                      className="text-red-600 hover:text-red-800 flex items-center ml-4"
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Group Reflection Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Group Reflection
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements & Progress (Optional)
              </label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Note any achievements, progress, or positive developments in the group..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenges & Needs (Optional)
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Note any challenges, difficulties, or support needed..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                General Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Any other observations or notes about the group..."
              />
            </div>
          </div>
        </div>

        {/* Timestamps (Read-only for editing) */}
        {initialData.id && (
          <div className="mb-6 text-sm text-gray-500">
            <div className="flex space-x-4">
              <span>Created: {new Date(formData.createdAt).toLocaleDateString()}</span>
              <span>Last Updated: {new Date(formData.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {initialData.id ? 'Update Group' : 'Save Junior Youth Group'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JuniorYouthGroupForm;