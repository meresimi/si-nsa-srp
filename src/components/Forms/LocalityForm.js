import React, { useState } from 'react';
import { Save } from 'lucide-react';

const LocalityForm = ({ onSave, initialData = {} }) => {
  const [locality, setLocality] = useState({
    date: initialData.date || new Date().toISOString().split('T')[0],
    region: initialData.region || '',
    cluster: initialData.cluster || '',
    locality: initialData.locality || '',
    focusNeighbourhoods: initialData.focusNeighbourhoods || '',
    hasLSA: initialData.hasLSA || '',
    hasLocalFund: initialData.hasLocalFund || '',
    observesFeast: initialData.observesFeast || '',
    feastAttendees: initialData.feastAttendees || '',
    observesHolyDays: initialData.observesHolyDays || '',
    holyDayAttendees: initialData.holyDayAttendees || '',
    hasDevotionals: initialData.hasDevotionals || '',
    devotionalMeetings: initialData.devotionalMeetings || '',
    devotionalParticipants: initialData.devotionalParticipants || '',
    friendsOfFaith: initialData.friendsOfFaith || '',
    conductsHomeVisits: initialData.conductsHomeVisits || '',
    homesVisited: initialData.homesVisited || ''
  });

  const handleSave = () => {
    if (!locality.region || !locality.cluster || !locality.locality) {
      alert('Please fill in required fields: Region, Cluster, and Locality');
      return;
    }
    onSave(locality);
    setLocality({
      date: new Date().toISOString().split('T')[0],
      region: '',
      cluster: '',
      locality: '',
      focusNeighbourhoods: '',
      hasLSA: '',
      hasLocalFund: '',
      observesFeast: '',
      feastAttendees: '',
      observesHolyDays: '',
      holyDayAttendees: '',
      hasDevotionals: '',
      devotionalMeetings: '',
      devotionalParticipants: '',
      friendsOfFaith: '',
      conductsHomeVisits: '',
      homesVisited: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            value={locality.date}
            onChange={(e) => setLocality({ ...locality, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
          <input
            type="text"
            value={locality.region}
            onChange={(e) => setLocality({ ...locality, region: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cluster *</label>
          <input
            type="text"
            value={locality.cluster}
            onChange={(e) => setLocality({ ...locality, cluster: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality *</label>
          <input
            type="text"
            value={locality.locality}
            onChange={(e) => setLocality({ ...locality, locality: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Focus Neighbourhood(s)</label>
          <input
            type="text"
            value={locality.focusNeighbourhoods}
            onChange={(e) => setLocality({ ...locality, focusNeighbourhoods: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-800 mb-4">Community Activities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Local Spiritual Assembly?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.hasLSA === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, hasLSA: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.hasLSA === 'No'}
                    onChange={(e) => setLocality({ ...locality, hasLSA: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Local Fund Established?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.hasLocalFund === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, hasLocalFund: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.hasLocalFund === 'No'}
                    onChange={(e) => setLocality({ ...locality, hasLocalFund: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nineteen Day Feast Observed?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.observesFeast === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, observesFeast: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.observesFeast === 'No'}
                    onChange={(e) => setLocality({ ...locality, observesFeast: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {locality.observesFeast === 'Yes' && (
                <input
                  type="number"
                  placeholder="Estimated attendees"
                  value={locality.feastAttendees}
                  onChange={(e) => setLocality({ ...locality, feastAttendees: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Holy Days Observed?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.observesHolyDays === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, observesHolyDays: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.observesHolyDays === 'No'}
                    onChange={(e) => setLocality({ ...locality, observesHolyDays: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {locality.observesHolyDays === 'Yes' && (
                <input
                  type="number"
                  placeholder="Estimated attendees"
                  value={locality.holyDayAttendees}
                  onChange={(e) => setLocality({ ...locality, holyDayAttendees: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Devotional Meetings Held?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.hasDevotionals === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, hasDevotionals: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.hasDevotionals === 'No'}
                    onChange={(e) => setLocality({ ...locality, hasDevotionals: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {locality.hasDevotionals === 'Yes' && (
                <>
                  <input
                    type="number"
                    placeholder="Number of regular meetings"
                    value={locality.devotionalMeetings}
                    onChange={(e) => setLocality({ ...locality, devotionalMeetings: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                  />
                  <input
                    type="number"
                    placeholder="Total participants"
                    value={locality.devotionalParticipants}
                    onChange={(e) => setLocality({ ...locality, devotionalParticipants: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                  />
                  <input
                    type="number"
                    placeholder="Friends of the Faith"
                    value={locality.friendsOfFaith}
                    onChange={(e) => setLocality({ ...locality, friendsOfFaith: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                  />
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Visits Conducted?</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Yes"
                    checked={locality.conductsHomeVisits === 'Yes'}
                    onChange={(e) => setLocality({ ...locality, conductsHomeVisits: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="No"
                    checked={locality.conductsHomeVisits === 'No'}
                    onChange={(e) => setLocality({ ...locality, conductsHomeVisits: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {locality.conductsHomeVisits === 'Yes' && (
                <input
                  type="number"
                  placeholder="Homes visited for deepening"
                  value={locality.homesVisited}
                  onChange={(e) => setLocality({ ...locality, homesVisited: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Save className="w-5 h-5" />
        Save Locality Details
      </button>
    </div>
  );
};

export default LocalityForm;