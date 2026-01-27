import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

const ChildrenClassesForm = ({ onSave, initialData = {} }) => {
  const [meta, setMeta] = useState({
    date: initialData.date || new Date().toISOString().split('T')[0],
    locality: initialData.locality || '',
    focusNeighbourhood: initialData.focusNeighbourhood || '',
    teachers: initialData.teachers || '',
    grade: initialData.grade || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    totalParticipants: initialData.totalParticipants || '',
    bahaiParticipants: initialData.bahaiParticipants || ''
  });

  const [participants, setParticipants] = useState(initialData.participants || [
    {
      firstName: '',
      familyName: '',
      sex: '',
      age: '',
      fromBahaiFamily: ''
    }
  ]);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        firstName: '',
        familyName: '',
        sex: '',
        age: '',
        fromBahaiFamily: ''
      }
    ]);
  };

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (i, field, value) => {
    const updated = [...participants];
    updated[i][field] = value;
    setParticipants(updated);
  };

  const handleSave = () => {
    if (!meta.locality || !meta.grade) {
      alert('Please fill in Locality and Grade');
      return;
    }
    onSave({ ...meta, participants });
    setMeta({
      date: new Date().toISOString().split('T')[0],
      locality: '',
      focusNeighbourhood: '',
      teachers: '',
      grade: '',
      startDate: '',
      endDate: '',
      totalParticipants: '',
      bahaiParticipants: ''
    });
    setParticipants([
      {
        firstName: '',
        familyName: '',
        sex: '',
        age: '',
        fromBahaiFamily: ''
      }
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={meta.date}
            onChange={(e) => setMeta({ ...meta, date: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Locality *</label>
          <input
            type="text"
            value={meta.locality}
            onChange={(e) => setMeta({ ...meta, locality: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Focus Neighbourhood</label>
          <input
            type="text"
            value={meta.focusNeighbourhood}
            onChange={(e) => setMeta({ ...meta, focusNeighbourhood: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teacher(s)</label>
          <input
            type="text"
            value={meta.teachers}
            onChange={(e) => setMeta({ ...meta, teachers: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grade *</label>
          <select
            value={meta.grade}
            onChange={(e) => setMeta({ ...meta, grade: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={meta.startDate}
            onChange={(e) => setMeta({ ...meta, startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={meta.endDate}
            onChange={(e) => setMeta({ ...meta, endDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Participants</label>
          <input
            type="number"
            value={meta.totalParticipants}
            onChange={(e) => setMeta({ ...meta, totalParticipants: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bahá'í Participants</label>
          <input
            type="number"
            value={meta.bahaiParticipants}
            onChange={(e) => setMeta({ ...meta, bahaiParticipants: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Participants</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-xs">#</th>
                <th className="border p-2 text-xs">First Name</th>
                <th className="border p-2 text-xs">Family Name</th>
                <th className="border p-2 text-xs">Sex</th>
                <th className="border p-2 text-xs">Age/DOB</th>
                <th className="border p-2 text-xs">From Bahá'í Family</th>
                <th className="border p-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {