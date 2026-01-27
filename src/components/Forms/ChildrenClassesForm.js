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
              { participants.map((p, i) => (

{i + 1}

<input
type="text"
value={p.firstName}
onChange={(e) => updateParticipant(i, 'firstName', e.target.value)}
className="w-full px-2 py-1 text-sm"
/>


<input
type="text"
value={p.familyName}
onChange={(e) => updateParticipant(i, 'familyName', e.target.value)}
className="w-full px-2 py-1 text-sm"
/>


<select
value={p.sex}
onChange={(e) => updateParticipant(i, 'sex', e.target.value)}
className="w-full px-2 py-1 text-sm"
>
-
M
F



<input
type="text"
value={p.age}
onChange={(e) => updateParticipant(i, 'age', e.target.value)}
placeholder="Age or DOB"
className="w-full px-2 py-1 text-sm"
/>


<select
value={p.fromBahaiFamily}
onChange={(e) => updateParticipant(i, 'fromBahaiFamily', e.target.value)}
className="w-full px-2 py-1 text-sm"
>
-
Y
N



{participants.length > 1 && (
<button
onClick={() => removeParticipant(i)}
className="text-red-600 hover:text-red-800"
>


)}


))}




<div className="flex gap-2">
    <button
      onClick={addParticipant}
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
    >
      <Plus className="w-4 h-4" /> Add Participant
    </button>
    <button
      onClick={handleSave}
      className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      <Save className="w-5 h-5" /> Save Class
    </button>
  </div>
</div>
);
};
export default ChildrenClassesForm;
### **4. src/components/Forms/JuniorYouthGroupForm.js**
```javascript
import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

const JuniorYouthGroupForm = ({ onSave, initialData = {} }) => {
  const [meta, setMeta] = useState({
    date: initialData.date || new Date().toISOString().split('T')[0],
    locality: initialData.locality || '',
    focusNeighbourhood: initialData.focusNeighbourhood || '',
    animators: initialData.animators || '',
    book: initialData.book || '',
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

  const books = [
    'BC - Breezes of Confirmation',
    'WJ - Walking the Straight Path',
    'HO - Habits of an Orderly Mind',
    'GH - Glimmerings of Hope',
    'WS - The Power of the Holy Spirit',
    'HW - Learning About Excellence',
    'LE - Thou the Nightingale of Paradise',
    'TN - Observation and Insight',
    'OI - Human Temple',
    'HT - Drawing on the Power of Prayer',
    'DP - Spirit of Faith',
    'SF - Power of the Holy Spirit'
  ];

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
    if (!meta.locality || !meta.book) {
      alert('Please fill in Locality and Book');
      return;
    }
    onSave({ ...meta, participants });
    setMeta({
      date: new Date().toISOString().split('T')[0],
      locality: '',
      focusNeighbourhood: '',
      animators: '',
      book: '',
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
          <label className="block text-sm font-medium mb-1">Animator(s)</label>
          <input
            type="text"
            value={meta.animators}
            onChange={(e) => setMeta({ ...meta, animators: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Book *</label>
          <select
            value={meta.book}
            onChange={(e) => setMeta({ ...meta, book: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
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
              {participants.map((p, i) => (
                <tr key={i}>
                  <td className="border p-1 text-center">{i + 1}</td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={p.firstName}
                      onChange={(e) => updateParticipant(i, 'firstName', e.target.value)}
                      className="w-full px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={p.familyName}
                      onChange={(e) => updateParticipant(i, 'familyName', e.target.value)}
                      className="w-full px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="border p-1">
                    <select
                      value={p.sex}
                      onChange={(e) => updateParticipant(i, 'sex', e.target.value)}
                      className="w-full px-2 py-1 text-sm"
                    >
                      <option value="">-</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      value={p.age}
                      onChange={(e) => updateParticipant(i, 'age', e.target.value)}
                      placeholder="Age or DOB"
                      className="w-full px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="border p-1">
                    <select
                      value={p.fromBahaiFamily}
                      onChange={(e) => updateParticipant(i, 'fromBahaiFamily', e.target.value)}
                      className="w-full px-2 py-1 text-sm"
                    >
                      <option value="">-</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </td>
                  <td className="border p-1 text-center">
                    {participants.length > 1 && (
                      <button
                        onClick={() => removeParticipant(i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={addParticipant}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Participant
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> Save Group
        </button>
      </div>
    </div>
  );
};
