import React, { useState, useEffect } from 'react';
import { Users, MapPin, BookOpen, ChevronRight, Plus, Menu, X, Save, Trash2, Download, ArrowLeft } from 'lucide-react';
import './App.css';

const STORAGE_KEYS = {
  localities: 'sinsa_localities',
  individuals: 'sinsa_individuals',
  childrenClasses: 'sinsa_children_classes',
  juniorYouthGroups: 'sinsa_junior_youth_groups',
  studyCircles: 'sinsa_study_circles'
};

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [savedRecords, setSavedRecords] = useState({});

  useEffect(() => {
    const loaded = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const data = localStorage.getItem(storageKey);
      loaded[key] = data ? JSON.parse(data) : [];
    });
    setSavedRecords(loaded);
  }, []);

  const saveRecord = (formType, data) => {
    const records = [...(savedRecords[formType] || [])];
    const newRecord = { id: Date.now(), timestamp: new Date().toISOString(), ...data };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
    alert('Record saved successfully!');
  };

  const deleteRecord = (formType, id) => {
    if (!window.confirm('Delete this record?')) return;
    const records = savedRecords[formType].filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS[formType], JSON.stringify(records));
    setSavedRecords(prev => ({ ...prev, [formType]: records }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(savedRecords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `srp-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const forms = [
    { id: 'localities', name: 'Locality Details', icon: MapPin, color: 'bg-blue-500' },
    { id: 'individuals', name: 'Basic Information', icon: Users, color: 'bg-green-500' },
    { id: 'childrenClasses', name: "Children's Classes", icon: BookOpen, color: 'bg-pink-500' },
    { id: 'juniorYouthGroups', name: 'Junior Youth Groups', icon: Users, color: 'bg-indigo-500' },
    { id: 'studyCircles', name: 'Study Circles', icon: BookOpen, color: 'bg-teal-500' }
  ];

  const DashboardView = () => {
    const totalRecords = Object.values(savedRecords).reduce((sum, records) => sum + records.length, 0);

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">SRP Data Collection</h1>
            <p className="dashboard-subtitle">Systematic Regional Program - Community Building</p>
          </div>
          <button onClick={exportData} className="btn-export">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value text-blue-600">{totalRecords}</div>
            <div className="stat-label">Total Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-green-600">{savedRecords.localities?.length || 0}</div>
            <div className="stat-label">Localities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-purple-600">{savedRecords.individuals?.length || 0}</div>
            <div className="stat-label">Individuals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-orange-600">
              {(savedRecords.childrenClasses?.length || 0) + (savedRecords.juniorYouthGroups?.length || 0) + (savedRecords.studyCircles?.length || 0)}
            </div>
            <div className="stat-label">Activities</div>
          </div>
        </div>

        <div className="forms-grid">
          {forms.map(form => (
            <div key={form.id} onClick={() => setActiveView(form.id)} className="form-card">
              <div className="form-card-header">
                <div className={`form-icon ${form.color}`}>
                  <form.icon className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="form-card-title">{form.name}</h3>
              <p className="form-card-count">{savedRecords[form.id]?.length || 0} records</p>
            </div>
          ))}
        </div>

        <div className="info-banner">
          <h2 className="info-banner-title">Cross-Platform Application</h2>
          <p className="info-banner-text">Works on Android, iOS, and Windows using Capacitor & Electron. All data stored locally.</p>
        </div>
      </div>
    );
  };

  const LocalityDetailsForm = () => {
    const [locality, setLocality] = useState({
      date: new Date().toISOString().split('T')[0], region: '', cluster: '', locality: '', focusNeighbourhoods: '',
      hasLSA: '', hasLocalFund: '', observesFeast: '', feastAttendees: '', observesHolyDays: '', holyDayAttendees: '',
      hasDevotionals: '', devotionalMeetings: '', devotionalParticipants: '', friendsOfFaith: '', conductsHomeVisits: '', homesVisited: ''
    });

    const handleSave = () => {
      if (!locality.region || !locality.cluster || !locality.locality) {
        alert('Please fill Region, Cluster, and Locality');
        return;
      }
      saveRecord('localities', locality);
      setLocality({
        date: new Date().toISOString().split('T')[0], region: '', cluster: '', locality: '', focusNeighbourhoods: '',
        hasLSA: '', hasLocalFund: '', observesFeast: '', feastAttendees: '', observesHolyDays: '', holyDayAttendees: '',
        hasDevotionals: '', devotionalMeetings: '', devotionalParticipants: '', friendsOfFaith: '', conductsHomeVisits: '', homesVisited: ''
      });
    };

    return (
      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input type="date" value={locality.date} onChange={(e) => setLocality({...locality, date: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Region *</label>
            <input type="text" value={locality.region} onChange={(e) => setLocality({...locality, region: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Cluster *</label>
            <input type="text" value={locality.cluster} onChange={(e) => setLocality({...locality, cluster: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Locality *</label>
            <input type="text" value={locality.locality} onChange={(e) => setLocality({...locality, locality: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Focus Neighbourhood(s)</label>
            <input type="text" value={locality.focusNeighbourhoods} onChange={(e) => setLocality({...locality, focusNeighbourhoods: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Community Activities</h3>
          <div className="form-row">
            <div className="activities-column">
              <div className="form-group">
                <label className="form-label">Local Spiritual Assembly?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.hasLSA === 'Yes'} onChange={(e) => setLocality({...locality, hasLSA: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.hasLSA === 'No'} onChange={(e) => setLocality({...locality, hasLSA: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Local Fund Established?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.hasLocalFund === 'Yes'} onChange={(e) => setLocality({...locality, hasLocalFund: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.hasLocalFund === 'No'} onChange={(e) => setLocality({...locality, hasLocalFund: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nineteen Day Feast Observed?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.observesFeast === 'Yes'} onChange={(e) => setLocality({...locality, observesFeast: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.observesFeast === 'No'} onChange={(e) => setLocality({...locality, observesFeast: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
                {locality.observesFeast === 'Yes' && (
                  <input type="number" placeholder="Estimated attendees" value={locality.feastAttendees} onChange={(e) => setLocality({...locality, feastAttendees: e.target.value})} className="form-input mt-2" />
                )}
              </div>
            </div>

            <div className="activities-column">
              <div className="form-group">
                <label className="form-label">Holy Days Observed?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.observesHolyDays === 'Yes'} onChange={(e) => setLocality({...locality, observesHolyDays: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.observesHolyDays === 'No'} onChange={(e) => setLocality({...locality, observesHolyDays: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
                {locality.observesHolyDays === 'Yes' && (
                  <input type="number" placeholder="Estimated attendees" value={locality.holyDayAttendees} onChange={(e) => setLocality({...locality, holyDayAttendees: e.target.value})} className="form-input mt-2" />
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Devotional Meetings Held?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.hasDevotionals === 'Yes'} onChange={(e) => setLocality({...locality, hasDevotionals: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.hasDevotionals === 'No'} onChange={(e) => setLocality({...locality, hasDevotionals: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
                {locality.hasDevotionals === 'Yes' && (
                  <>
                    <input type="number" placeholder="Number of regular meetings" value={locality.devotionalMeetings} onChange={(e) => setLocality({...locality, devotionalMeetings: e.target.value})} className="form-input mt-2" />
                    <input type="number" placeholder="Total participants" value={locality.devotionalParticipants} onChange={(e) => setLocality({...locality, devotionalParticipants: e.target.value})} className="form-input mt-2" />
                    <input type="number" placeholder="Friends of the Faith" value={locality.friendsOfFaith} onChange={(e) => setLocality({...locality, friendsOfFaith: e.target.value})} className="form-input mt-2" />
                  </>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Home Visits Conducted?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" value="Yes" checked={locality.conductsHomeVisits === 'Yes'} onChange={(e) => setLocality({...locality, conductsHomeVisits: e.target.value})} className="radio-input" />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" value="No" checked={locality.conductsHomeVisits === 'No'} onChange={(e) => setLocality({...locality, conductsHomeVisits: e.target.value})} className="radio-input" />
                    No
                  </label>
                </div>
                {locality.conductsHomeVisits === 'Yes' && (
                  <input type="number" placeholder="Homes visited for deepening" value={locality.homesVisited} onChange={(e) => setLocality({...locality, homesVisited: e.target.value})} className="form-input mt-2" />
                )}
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-save">
          <Save className="w-5 h-5" />Save Locality Details
        </button>
      </div>
    );
  };

  const IndividualsForm = () => {
    const [meta, setMeta] = useState({ region: '', cluster: '', locality: '', focusNeighbourhood: '' });
    const [rows, setRows] = useState([{ firstName: '', familyName: '', sex: '', age: '', registered: '', enrollmentDate: '', address: '', telephone: '', email: '' }]);

    const addRow = () => setRows([...rows, { firstName: '', familyName: '', sex: '', age: '', registered: '', enrollmentDate: '', address: '', telephone: '', email: '' }]);
    const updateRow = (i, field, value) => {
      const updated = [...rows];
      updated[i][field] = value;
      setRows(updated);
    };

    const handleSave = () => {
      if (!meta.region || !meta.cluster || !meta.locality) {
        alert('Please fill Region, Cluster, and Locality');
        return;
      }
      saveRecord('individuals', { ...meta, individuals: rows });
      setMeta({ region: '', cluster: '', locality: '', focusNeighbourhood: '' });
      setRows([{ firstName: '', familyName: '', sex: '', age: '', registered: '', enrollmentDate: '', address: '', telephone: '', email: '' }]);
    };

    return (
      <div className="form-content">
        <div className="metadata-section">
          <div className="form-group">
            <label className="form-label">Region *</label>
            <input type="text" value={meta.region} onChange={(e) => setMeta({...meta, region: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Cluster *</label>
            <input type="text" value={meta.cluster} onChange={(e) => setMeta({...meta, cluster: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Locality *</label>
            <input type="text" value={meta.locality} onChange={(e) => setMeta({...meta, locality: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Focus Neighbourhood</label>
            <input type="text" value={meta.focusNeighbourhood} onChange={(e) => setMeta({...meta, focusNeighbourhood: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Family Name</th>
                <th>Sex</th>
                <th>Age</th>
                <th>Registered</th>
                <th>Enrollment Date</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input type="text" value={row.firstName} onChange={(e) => updateRow(i, 'firstName', e.target.value)} className="table-input" /></td>
                  <td><input type="text" value={row.familyName} onChange={(e) => updateRow(i, 'familyName', e.target.value)} className="table-input" /></td>
                  <td>
                    <select value={row.sex} onChange={(e) => updateRow(i, 'sex', e.target.value)} className="table-input">
                      <option value="">-</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td><input type="number" value={row.age} onChange={(e) => updateRow(i, 'age', e.target.value)} className="table-input" /></td>
                  <td>
                    <select value={row.registered} onChange={(e) => updateRow(i, 'registered', e.target.value)} className="table-input">
                      <option value="">-</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </td>
                  <td><input type="date" value={row.enrollmentDate} onChange={(e) => updateRow(i, 'enrollmentDate', e.target.value)} className="table-input" /></td>
                  <td><input type="text" value={row.address} onChange={(e) => updateRow(i, 'address', e.target.value)} className="table-input" /></td>
                  <td><input type="tel" value={row.telephone} onChange={(e) => updateRow(i, 'telephone', e.target.value)} className="table-input" /></td>
                  <td><input type="email" value={row.email} onChange={(e) => updateRow(i, 'email', e.target.value)} className="table-input" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-actions">
          <button onClick={addRow} className="btn-secondary">
            <Plus className="w-4 h-4" />Add Row
          </button>
          <button onClick={handleSave} className="btn-save flex-1">
            <Save className="w-5 h-5" />Save Records
          </button>
        </div>
      </div>
    );
  };

  const ChildrenClassesForm = () => {
    const [classData, setClassData] = useState({
      locality: '',
      teacher: '',
      grade: '',
      startDate: '',
      endDate: '',
      totalParticipants: '',
      bahaiParticipants: ''
    });

    const handleSave = () => {
      if (!classData.locality || !classData.teacher || !classData.grade) {
        alert('Please fill required fields');
        return;
      }
      saveRecord('childrenClasses', classData);
      setClassData({
        locality: '',
        teacher: '',
        grade: '',
        startDate: '',
        endDate: '',
        totalParticipants: '',
        bahaiParticipants: ''
      });
    };

    return (
      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Locality *</label>
            <input type="text" value={classData.locality} onChange={(e) => setClassData({...classData, locality: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Teacher(s) *</label>
            <input type="text" value={classData.teacher} onChange={(e) => setClassData({...classData, teacher: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Grade *</label>
            <select value={classData.grade} onChange={(e) => setClassData({...classData, grade: e.target.value})} className="form-input">
              <option value="">Select Grade</option>
              <option value="G1">Grade 1</option>
              <option value="G2">Grade 2</option>
              <option value="G3">Grade 3</option>
              <option value="G4">Grade 4</option>
              <option value="G5">Grade 5</option>
              <option value="G6">Grade 6</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" value={classData.startDate} onChange={(e) => setClassData({...classData, startDate: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input type="date" value={classData.endDate} onChange={(e) => setClassData({...classData, endDate: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Total Participants</label>
            <input type="number" value={classData.totalParticipants} onChange={(e) => setClassData({...classData, totalParticipants: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Bahá'í Participants</label>
            <input type="number" value={classData.bahaiParticipants} onChange={(e) => setClassData({...classData, bahaiParticipants: e.target.value})} className="form-input" />
          </div>
        </div>

        <button onClick={handleSave} className="btn-save">
          <Save className="w-5 h-5" />Save Children's Class
        </button>
      </div>
    );
  };

  const JuniorYouthGroupForm = () => {
    const [groupData, setGroupData] = useState({
      locality: '',
      animator: '',
      book: '',
      startDate: '',
      endDate: '',
      totalParticipants: '',
      bahaiParticipants: ''
    });

    const handleSave = () => {
      if (!groupData.locality || !groupData.animator || !groupData.book) {
        alert('Please fill required fields');
        return;
      }
      saveRecord('juniorYouthGroups', groupData);
      setGroupData({
        locality: '',
        animator: '',
        book: '',
        startDate: '',
        endDate: '',
        totalParticipants: '',
        bahaiParticipants: ''
      });
    };

    return (
      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Locality *</label>
            <input type="text" value={groupData.locality} onChange={(e) => setGroupData({...groupData, locality: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Animator(s) *</label>
            <input type="text" value={groupData.animator} onChange={(e) => setGroupData({...groupData, animator: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Book *</label>
            <select value={groupData.book} onChange={(e) => setGroupData({...groupData, book: e.target.value})} className="form-input">
              <option value="">Select Book</option>
              <option value="BC">Breezes of Confirmation</option>
              <option value="WJ">Walking the Straight Path</option>
              <option value="HO">Habits of an Orderly Mind</option>
              <option value="GH">Glimmerings of Hope</option>
              <option value="WS">Whisperings of the Spirit</option>
              <option value="HW">The Human Temple</option>
              <option value="LE">Learning about Excellence</option>
              <option value="TN">Thinking about Numbers</option>
              <option value="OI">Observation and Insight</option>
              <option value="HT">The Human Temple</option>
              <option value="DP">Drawing on the Power of the Word</option>
              <option value="SF">Spirit of Faith</option>
              <option value="PH">Power of the Holy Spirit</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" value={groupData.startDate} onChange={(e) => setGroupData({...groupData, startDate: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input type="date" value={groupData.endDate} onChange={(e) => setGroupData({...groupData, endDate: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Total Participants</label>
            <input type="number" value={groupData.totalParticipants} onChange={(e) => setGroupData({...groupData, totalParticipants: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Bahá'í Participants</label>
            <input type="number" value={groupData.bahaiParticipants} onChange={(e) => setGroupData({...groupData, bahaiParticipants: e.target.value})} className="form-input" />
          </div>
        </div>

        <button onClick={handleSave} className="btn-save">
          <Save className="w-5 h-5" />Save Junior Youth Group
        </button>
      </div>
    );
  };

  const StudyCircleForm = () => {
    const [circleData, setCircleData] = useState({
      locality: '',
      tutor: '',
      book: '',
      startDate: '',
      completedDate: '',
      totalParticipants: '',
      bahaiParticipants: ''
    });

    const handleSave = () => {
      if (!circleData.locality || !circleData.tutor || !circleData.book) {
        alert('Please fill required fields');
        return;
      }
      saveRecord('studyCircles', circleData);
      setCircleData({
        locality: '',
        tutor: '',
        book: '',
        startDate: '',
        completedDate: '',
        totalParticipants: '',
        bahaiParticipants: ''
      });
    };

    return (
      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Locality *</label>
            <input type="text" value={circleData.locality} onChange={(e) => setCircleData({...circleData, locality: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Tutor(s) *</label>
            <input type="text" value={circleData.tutor} onChange={(e) => setCircleData({...circleData, tutor: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Book *</label>
            <select value={circleData.book} onChange={(e) => setCircleData({...circleData, book: e.target.value})} className="form-input">
<option value="">Select Book</option>
              <option value="Book 1">Book 1: Reflections on the Life of the Spirit</option>
              <option value="Book 2">Book 2: Arising to Serve</option>
              <option value="Book 3">Book 3: Teaching Children's Classes Grade 1</option>
              <option value="Book 4">Book 4: The Twin Manifestations</option>
              <option value="Book 5">Book 5: Releasing the Powers of Junior Youth</option>
              <option value="Book 6">Book 6: Teaching Children's Classes Grade 2</option>
              <option value="Book 7">Book 7: Walking Together on a Path of Service</option>
              <option value="Book 8">Book 8: The Covenant of Bahá'u'lláh</option>
              <option value="Book 9">Book 9: Gaining an Historical Perspective</option>
              <option value="Book 10">Book 10: Building Vibrant Communities</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" value={circleData.startDate} onChange={(e) => setCircleData({...circleData, startDate: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Completed Date</label>
            <input type="date" value={circleData.completedDate} onChange={(e) => setCircleData({...circleData, completedDate: e.target.value})} className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Total Participants</label>
            <input type="number" value={circleData.totalParticipants} onChange={(e) => setCircleData({...circleData, totalParticipants: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Bahá'í Participants</label>
            <input type="number" value={circleData.bahaiParticipants} onChange={(e) => setCircleData({...circleData, bahaiParticipants: e.target.value})} className="form-input" />
          </div>
        </div>

        <button onClick={handleSave} className="btn-save">
          <Save className="w-5 h-5" />Save Study Circle
        </button>
      </div>
    );
  };

  const RecordsList = ({ formType }) => {
    const records = savedRecords[formType] || [];
    return (
      <div className="records-list">
        <h3 className="records-title">Saved Records ({records.length})</h3>
        {records.length === 0 ? (
          <p className="records-empty">No records saved yet</p>
        ) : (
          <div className="records-container">
            {records.map((record) => (
              <div key={record.id} className="record-item">
                <div>
                  <p className="record-date">{new Date(record.timestamp).toLocaleString()}</p>
                  <p className="record-info">{record.region || record.locality || 'Record #' + record.id}</p>
                </div>
                <button onClick={() => deleteRecord(formType, record.id)} className="btn-delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderFormContent = () => {
    const form = forms.find(f => f.id === activeView);
    if (!form) return null;

    return (
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => setActiveView('dashboard')} className="btn-back">
            <ArrowLeft className="w-4 h-4" />Back to Dashboard
          </button>
          <h1 className="page-title">{form.name}</h1>
        </div>

        <div className="page-content">
          {activeView === 'localities' && <LocalityDetailsForm />}
          {activeView === 'individuals' && <IndividualsForm />}
          {activeView === 'childrenClasses' && <ChildrenClassesForm />}
          {activeView === 'juniorYouthGroups' && <JuniorYouthGroupForm />}
          {activeView === 'studyCircles' && <StudyCircleForm />}
        </div>

        <RecordsList formType={activeView} />
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">SI-NSA SRP</h2>
          <nav className="sidebar-nav">
            <button onClick={() => setActiveView('dashboard')} className={`nav-item ${activeView === 'dashboard' ? 'nav-item-active' : ''}`}>
              Dashboard
            </button>
            {forms.map(form => (
              <button key={form.id} onClick={() => setActiveView(form.id)} className={`nav-item ${activeView === form.id ? 'nav-item-active' : ''}`}>
                <form.icon className="w-4 h-4" />{form.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="header-title">SI-NSA SRP Data Collection</h1>
        </div>

        {activeView === 'dashboard' ? <DashboardView /> : renderFormContent()}
      </div>
    </div>
  );
};

export default App;