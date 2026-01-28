import React, { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Users, 
  Calendar, 
  BookOpen, 
  UserPlus, 
  UserMinus,
  BookMarked,
  Clock,
  Award,
  Users as UsersIcon
} from 'lucide-react';
import FormField from '../Shared/FormField';

const StudyCircleForm = ({ 
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
    completedDate: initialData.completedDate || '',
    
    // Study Information
    book: initialData.book || 'book1', // Ruhi Book ID
    bookTitle: initialData.bookTitle || 'Reflections on the Life of the Spirit',
    unit: initialData.unit || '1', // Current unit being studied (1-3 for most books)
    
    // Tutors/Facilitators
    tutors: initialData.tutors || [],
    
    // Participants Information
    participants: initialData.participants || [],
    totalParticipants: initialData.totalParticipants || 0,
    registeredBahaiParticipants: initialData.registeredBahaiParticipants || 0,
    completedParticipants: initialData.completedParticipants || [],
    
    // Meeting Information
    meetingFrequency: initialData.meetingFrequency || 'weekly',
    meetingDay: initialData.meetingDay || '',
    meetingTime: initialData.meetingTime || '',
    location: initialData.location || '',
    
    // Status and Progress
    status: initialData.status || 'active', // active, completed, suspended, ongoing
    progress: initialData.progress || 0, // 0-100 percentage
    isIntensive: initialData.isIntensive || false,
    startTime: initialData.startTime || '',
    endTime: initialData.endTime || '',
    
    // Completion Details
    completionMethod: initialData.completionMethod || '', // normal, intensive, self-study
    certificateIssued: initialData.certificateIssued || false,
    certificateIssueDate: initialData.certificateIssueDate || '',
    
    // Additional Information
    notes: initialData.notes || '',
    challenges: initialData.challenges || '',
    supportNeeded: initialData.supportNeeded || '',
    
    // Timestamps
    createdAt: initialData.createdAt || new Date().toISOString(),
    lastUpdated: initialData.lastUpdated || new Date().toISOString(),
  });

  const [availableFocusNeighbourhoods, setAvailableFocusNeighbourhoods] = useState([]);
  const [availableTutors, setAvailableTutors] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);
  
  // Ruhi Institute Books (from SRP 3.1 Reference Guide)
  const ruhiBooks = [
    { id: 'book1', title: 'Reflections on the Life of the Spirit', units: 3 },
    { id: 'book2', title: 'Arising to Serve', units: 3 },
    { id: 'book3', title: 'Teaching Children\'s Classes, Grade 1', units: 3 },
    { id: 'book4', title: 'The Twin Manifestations', units: 3 },
    { id: 'book5', title: 'Releasing the Powers of Junior Youth', units: 3 },
    { id: 'book6', title: 'Teaching the Cause', units: 3 },
    { id: 'book7', title: 'Walking Together on a Path of Service', units: 3 },
    { id: 'book8', title: 'The Covenant of Bahá\'u\'lláh', units: 3 },
    { id: 'book9', title: 'Gaining an Historical Perspective', units: 3 },
    { id: 'book10', title: 'Building Vibrant Communities', units: 3 },
  ];

  const meetingFrequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'intensive', label: 'Intensive (e.g., weekend)' },
    { value: 'irregular', label: 'Irregular' }
  ];

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const completionMethods = [
    { value: 'normal', label: 'Normal (regular meetings)' },
    { value: 'intensive', label: 'Intensive (e.g., weekend retreat)' },
    { value: 'self_study', label: 'Self-study with tutor' },
    { value: 'combined', label: 'Combined approach' }
  ];

  // Filter available individuals for tutors (should have completed the book being taught)
  useEffect(() => {
    // Tutors should be youth or adults who have completed the book they're teaching
    const potentialTutors = individuals.filter(ind => 
      (ind.ageCategory === 'youth' || ind.ageCategory === 'adult') &&
      ind.completedRuhiBooks?.includes(formData.book)
    );
    setAvailableTutors(potentialTutors);
    
    // Participants can be youth or adults
    const potentialParticipants = individuals.filter(ind => 
      ind.ageCategory === 'youth' || ind.ageCategory === 'adult'
    );
    setAvailableParticipants(potentialParticipants);
  }, [individuals, formData.book]);

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

  // Update book title when book ID changes
  useEffect(() => {
    const selectedBook = ruhiBooks.find(b => b.id === formData.book);
    if (selectedBook) {
      setFormData(prev => ({
        ...prev,
        bookTitle: selectedBook.title
      }));
    }
  }, [formData.book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };

    // Handle status changes
    if (name === 'status') {
      if (value === 'completed' && !formData.completedDate) {
        updatedData.completedDate = new Date().toISOString().split('T')[0];
        updatedData.endDate = new Date().toISOString().split('T')[0];
      } else if (value === 'active') {
        updatedData.completedDate = '';
        updatedData.endDate = '';
      }
    }

    // Update progress based on unit
    if (name === 'unit') {
      const selectedBook = ruhiBooks.find(b => b.id === formData.book);
      if (selectedBook) {
        const unitNum = parseInt(value);
        const totalUnits = selectedBook.units;
        const progress = Math.round((unitNum / totalUnits) * 100);
        updatedData.progress = progress;
      }
    }

    // Clear certificate date if certificate not issued
    if (name === 'certificateIssued' && !checked) {
      updatedData.certificateIssueDate = '';
    }

    // Handle intensive study mode
    if (name === 'isIntensive') {
      if (checked) {
        updatedData.meetingFrequency = 'intensive';
      }
    }

    setFormData(updatedData);
  };

  const handleBookChange = (bookId) => {
    const selectedBook = ruhiBooks.find(b => b.id === bookId);
    setFormData(prev => ({
      ...prev,
      book: bookId,
      bookTitle: selectedBook?.title || '',
      unit: '1',
      progress: Math.round((1 / (selectedBook?.units || 3)) * 100)
    }));
  };

  const handleAddTutor = (tutorId) => {
    if (!formData.tutors.includes(tutorId)) {
      setFormData(prev => ({
        ...prev,
        tutors: [...prev.tutors, tutorId]
      }));
    }
  };

  const handleRemoveTutor = (tutorId) => {
    setFormData(prev => ({
      ...prev,
      tutors: prev.tutors.filter(id => id !== tutorId)
    }));
  };

  const handleAddParticipant = (participantId) => {
    if (!formData.participants.includes(participantId)) {
      const participant = individuals.find(ind => ind.id === participantId);
      const isRegisteredBahai = participant?.isRegisteredBahai;
      
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantId],
        totalParticipants: prev.totalParticipants + 1,
        registeredBahaiParticipants: isRegisteredBahai ? 
          prev.registeredBahaiParticipants + 1 : prev.registeredBahaiParticipants
      }));
    }
  };

  const handleRemoveParticipant = (participantId) => {
    const participant = individuals.find(ind => ind.id === participantId);
    const isRegisteredBahai = participant?.isRegisteredBahai;
    
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(id => id !== participantId),
      totalParticipants: prev.totalParticipants - 1,
      registeredBahaiParticipants: isRegisteredBahai ? 
        prev.registeredBahaiParticipants - 1 : prev.registeredBahaiParticipants,
      completedParticipants: prev.completedParticipants.filter(id => id !== participantId)
    }));
  };

  const handleMarkParticipantCompleted = (participantId) => {
    if (formData.completedParticipants.includes(participantId)) {
      // Remove from completed
      setFormData(prev => ({
        ...prev,
        completedParticipants: prev.completedParticipants.filter(id => id !== participantId)
      }));
    } else {
      // Add to completed
      setFormData(prev => ({
        ...prev,
        completedParticipants: [...prev.completedParticipants, participantId]
      }));
    }
  };

  const handleMarkAllCompleted = () => {
    if (formData.status !== 'completed') {
      setFormData(prev => ({
        ...prev,
        status: 'completed',
        completedDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        completedParticipants: [...prev.participants],
        progress: 100,
        unit: ruhiBooks.find(b => b.id === formData.book)?.units.toString() || '3'
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
      registeredBahaiParticipants: formData.registeredBahaiParticipants || 
        formData.participants.filter(pid => {
          const participant = individuals.find(ind => ind.id === pid);
          return participant?.isRegisteredBahai;
        }).length
    };
    onSave(dataToSave);
  };

  const getBookUnits = () => {
    const book = ruhiBooks.find(b => b.id === formData.book);
    return book ? book.units : 3;
  };

  const getUnitOptions = () => {
    const units = getBookUnits();
    const options = [];
    for (let i = 1; i <= units; i++) {
      options.push({ value: i.toString(), label: `Unit ${i}` });
    }
    return options;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookMarked className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData.id ? 'Edit Study Circle' : 'New Study Circle'}
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
              label="Study Circle Name (Optional)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wednesday Evening Study Circle"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Locality *
              </label>
              <select
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                disabled={formData.status === 'completed'}
              />
            </div>

            {/* Intensive Study Checkbox */}
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isIntensive"
                  name="isIntensive"
                  checked={formData.isIntensive}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isIntensive" className="ml-2 text-sm font-medium text-gray-700">
                  This is an intensive study circle (e.g., weekend retreat, daily sessions)
                </label>
              </div>
              {formData.isIntensive && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                  <FormField
                    label="End Time"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book and Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <BookMarked className="h-5 w-5 mr-2" />
              Study Material & Progress
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">Progress</div>
                <div className="text-2xl font-bold text-indigo-600">{formData.progress}%</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="suspended">Suspended</option>
                  <option value="ongoing">Ongoing (between meetings)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ruhi Book *
                </label>
                <select
                  value={formData.book}
                  onChange={(e) => handleBookChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a book</option>
                  {ruhiBooks.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>

              {formData.book && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <div className="text-sm font-medium text-indigo-700">Selected Book:</div>
                  <div className="font-bold text-indigo-900 mt-1">{formData.bookTitle}</div>
                  <div className="text-sm text-indigo-600 mt-1">
                    {getBookUnits()} units total
                  </div>
                </div>
              )}
            </div>

            {/* Progress Tracking */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select current unit</option>
                  {getUnitOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Study Progress</span>
                  <span className="text-indigo-600">{formData.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${formData.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Unit {formData.unit} of {getBookUnits()}
                </div>
              </div>
            </div>
          </div>

          {/* Completion Details - Only show for completed or when completing */}
          {(formData.status === 'completed' || formData.status === 'active') && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Completion Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Completion Method
                  </label>
                  <select
                    name="completionMethod"
                    value={formData.completionMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select method</option>
                    {completionMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                <FormField
                  label="Completion Date"
                  name="completedDate"
                  type="date"
                  value={formData.completedDate}
                  onChange={handleChange}
                  disabled={formData.status !== 'completed'}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="certificateIssued"
                    name="certificateIssued"
                    checked={formData.certificateIssued}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="certificateIssued" className="ml-2 text-sm font-medium text-gray-700">
                    Certificates issued to participants
                  </label>
                </div>
                
                {formData.certificateIssued && (
                  <div className="mt-3">
                    <FormField
                      label="Certificate Issue Date"
                      name="certificateIssueDate"
                      type="date"
                      value={formData.certificateIssueDate}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {formData.status === 'active' && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleMarkAllCompleted}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                  >
                    <BookCheck className="h-4 w-4 mr-2" />
                    Mark Study Circle as Completed
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    This will mark the study circle as completed and update all participants' records.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tutors Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Tutors/Facilitators
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Tutors should have completed the book they are teaching.
            </p>
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTutor(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Select tutor...</option>
                {availableTutors.map(tutor => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.firstName} {tutor.familyName} 
                    {tutor.completedRuhiBooks?.includes(formData.book) ? 
                      ` (${formData.bookTitle} completed)` : ''}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  const select = document.querySelector('select');
                  if (select.value) {
                    handleAddTutor(select.value);
                    select.value = '';
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Selected Tutors */}
          {formData.tutors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Selected Tutors:</h4>
              {formData.tutors.map(tutorId => {
                const tutor = individuals.find(ind => ind.id === tutorId);
                return tutor ? (
                  <div key={tutorId} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded">
                    <div>
                      <span className="font-medium">{tutor.firstName} {tutor.familyName}</span>
                      <span className="text-sm text-gray-500 ml-2">({tutor.ageCategory})</span>
                      {tutor.completedRuhiBooks?.includes(formData.book) && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Book Completed
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTutor(tutorId)}
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
              <UsersIcon className="h-5 w-5 mr-2" />
              Participants (Youth & Adults)
            </h3>
            <div className="text-sm text-gray-600">
              Total: {formData.totalParticipants} | 
              Bahá'í: {formData.registeredBahaiParticipants} | 
              Completed: {formData.completedParticipants.length}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddParticipant(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Select participant...</option>
                {availableParticipants.map(participant => (
                  <option key={participant.id} value={participant.id}>
                    {participant.firstName} {participant.familyName} 
                    {participant.isRegisteredBahai ? ' (Bahá\'í)' : ''}
                    {participant.completedRuhiBooks?.includes(formData.book) ? 
                      ' (Book already completed)' : ''}
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
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
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
              label="Registered Bahá'í Participants (if not individually listed)"
              name="registeredBahaiParticipants"
              type="number"
              min="0"
              max={formData.totalParticipants}
              value={formData.registeredBahaiParticipants}
              onChange={handleChange}
            />
          </div>

          {/* Selected Participants with Completion Status */}
          {formData.participants.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Participants:</h4>
              {formData.participants.map(participantId => {
                const participant = individuals.find(ind => ind.id === participantId);
                const hasCompletedBook = participant?.completedRuhiBooks?.includes(formData.book);
                const isCompletedInCircle = formData.completedParticipants.includes(participantId);
                
                return participant ? (
                  <div key={participantId} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{participant.firstName} {participant.familyName}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          Age: {participant.estimatedAge || 'N/A'} | 
                          {participant.isRegisteredBahai ? ' Bahá\'í' : ' Not Bahá\'í'}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        {hasCompletedBook && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">
                            Previously completed this book
                          </span>
                        )}
                        {isCompletedInCircle && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Completed in this study circle
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleMarkParticipantCompleted(participantId)}
                        className={`px-3 py-1 text-sm rounded ${isCompletedInCircle ? 
                          'bg-green-100 text-green-800 hover:bg-green-200' : 
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        {isCompletedInCircle ? 'Marked Complete' : 'Mark Complete'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(participantId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Meeting Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Meeting Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Frequency
              </label>
              <select
                name="meetingFrequency"
                value={formData.meetingFrequency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={formData.isIntensive}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              placeholder="e.g., Community Center, Home, Institute building"
            />
          </div>
        </div>

        {/* Reflection and Notes Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Reflection & Notes</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Needed (Optional)
              </label>
              <textarea
                name="supportNeeded"
                value={formData.supportNeeded}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any support needed for this study circle..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenges (Optional)
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Any challenges or difficulties faced..."
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Any other observations or notes about the study circle..."
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
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {initialData.id ? 'Update Study Circle' : 'Save Study Circle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyCircleForm;