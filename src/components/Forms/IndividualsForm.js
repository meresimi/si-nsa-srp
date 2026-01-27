import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

const IndividualsForm = ({ onSave, initialData = {} }) => {
  const [meta, setMeta] = useState({
    region: initialData.region || '',
    cluster: initialData.cluster || '',
    locality: initialData.locality || '',
    focusNeighbourhood: initialData.focusNeighbourhood || ''
  });

  const [rows, setRows] = useState(initialData.individuals || [
    {
      firstName: '',
      familyName: '',
      sex: '',
      age: '',
      registered: '',
      enrollmentDate: '',
      address: '',
      telephone: '',
      email: ''
    }
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        firstName: '',
        familyName: '',
        sex: '',
        age: '',
        registered: '',
        enrollmentDate: '',
        address: '',
        telephone: '',
        email: ''
      }
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;
    setRows(updated);
  };

  const handleSave = () => {
    if (!meta.region || !meta.cluster || !meta.locality) {
      alert('Please fill in Region, Cluster, and Locality');
      return;
    }
    onSave({ ...meta, individuals: rows });
    setMeta({ region: '', cluster: '', locality: '', focusNeighbourhood: '' });
    setRows([
      {
        firstName: '',
        familyName: '',
        sex: '',
        age: '',
        registered: '',
        enrollmentDate: '',
        address: '',
        telephone: '',
        email: ''
      }
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Region *</label>
          <input
            type="text"
            value={meta.region}
            onChange={(e) => setMeta({ ...meta, region: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cluster *</label>
          <input
            type="text"
            value={meta.cluster}
            onChange={(e) => setMeta({ ...meta, cluster: e.target.value })}
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
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-xs">#</th>
              <th className="border p-2 text-xs">First Name</th>
              <th className="border p-2 text-xs">Family Name</th>
              <th className="border p-2 text-xs">Sex</th>
              <th className="border p-2 text-xs">Age</th>
              <th className="border p-2 text-xs">Registered</th>
              <th className="border p-2 text-xs">Enrollment Date</th>
              <th className="border p-2 text-xs">Address</th>
              <th className="border p-2 text-xs">Telephone</th>
              <th className="border p-2 text-xs">Email</th>
              <th className="border p-2 text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="border p-1 text-center">{i + 1}</td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={row.firstName}
                    onChange={(e) => updateRow(i, 'firstName', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={row.familyName}
                    onChange={(e) => updateRow(i, 'familyName', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <select
                    value={row.sex}
                    onChange={(e) => updateRow(i, 'sex', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  >
                    <option value="">-</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    value={row.age}
                    onChange={(e) => updateRow(i, 'age', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <select
                    value={row.registered}
                    onChange={(e) => updateRow(i, 'registered', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  >
                    <option value="">-</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </td>
                <td className="border p-1">
                  <input
                    type="date"
                    value={row.enrollmentDate}
                    onChange={(e) => updateRow(i, 'enrollmentDate', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    value={row.address}
                    onChange={(e) => updateRow(i, 'address', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="tel"
                    value={row.telephone}
                    onChange={(e) => updateRow(i, 'telephone', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => updateRow(i, 'email', e.target.value)}
                    className="w-full px-2 py-1 text-sm"
                  />
                </td>
                <td className="border p-1 text-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
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

      <div className="flex gap-2">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> Save Records
        </button>
      </div>
    </div>
  );
};

export default IndividualsForm;