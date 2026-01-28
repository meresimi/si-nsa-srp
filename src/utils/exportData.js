// Export data utilities for SI-NSA SRP

import { STORAGE_KEYS, APP_INFO } from './constants';
import { getAllRecords } from './storage';

// Generate filename with timestamp
export const generateFilename = (prefix = 'sinsa-srp', extension = 'json') => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${prefix}-${timestamp}.${extension}`;
};

// Export all data as JSON
export const exportToJSON = () => {
  const allData = {
    appInfo: {
      name: APP_INFO.NAME,
      version: APP_INFO.VERSION,
      exportDate: new Date().toISOString()
    },
    data: {
      localities: getAllRecords(STORAGE_KEYS.localities),
      individuals: getAllRecords(STORAGE_KEYS.individuals),
      childrenClasses: getAllRecords(STORAGE_KEYS.childrenClasses),
      juniorYouthGroups: getAllRecords(STORAGE_KEYS.juniorYouthGroups),
      studyCircles: getAllRecords(STORAGE_KEYS.studyCircles)
    },
    statistics: {
      totalLocalities: getAllRecords(STORAGE_KEYS.localities).length,
      totalIndividuals: getAllRecords(STORAGE_KEYS.individuals).length,
      totalActivities: 
        getAllRecords(STORAGE_KEYS.childrenClasses).length +
        getAllRecords(STORAGE_KEYS.juniorYouthGroups).length +
        getAllRecords(STORAGE_KEYS.studyCircles).length
    }
  };
  
  return allData;
};

// Download JSON file
export const downloadJSON = (data, filename) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || generateFilename();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export localities to CSV
export const exportLocalitiesToCSV = () => {
  const localities = getAllRecords(STORAGE_KEYS.localities);
  
  if (localities.length === 0) {
    return null;
  }
  
  const headers = [
    'Date', 'Region', 'Cluster', 'Locality', 'Focus Neighbourhoods',
    'Has LSA', 'Local Fund', 'Observes Feast', 'Feast Attendees',
    'Observes Holy Days', 'Holy Day Attendees', 'Has Devotionals',
    'Devotional Meetings', 'Devotional Participants', 'Friends of Faith',
    'Conducts Home Visits', 'Homes Visited'
  ];
  
  const rows = localities.map(loc => [
    loc.date || '',
    loc.region || '',
    loc.cluster || '',
    loc.locality || '',
    loc.focusNeighbourhoods || '',
    loc.hasLSA || '',
    loc.hasLocalFund || '',
    loc.observesFeast || '',
    loc.feastAttendees || '',
    loc.observesHolyDays || '',
    loc.holyDayAttendees || '',
    loc.hasDevotionals || '',
    loc.devotionalMeetings || '',
    loc.devotionalParticipants || '',
    loc.friendsOfFaith || '',
    loc.conductsHomeVisits || '',
    loc.homesVisited || ''
  ]);
  
  return convertToCSV([headers, ...rows]);
};

// Export individuals to CSV
export const exportIndividualsToCSV = () => {
  const individuals = getAllRecords(STORAGE_KEYS.individuals);
  
  if (individuals.length === 0) {
    return null;
  }
  
  const headers = [
    'First Name', 'Family Name', 'Sex', 'Age', 'Date of Birth',
    'Registered Bahá\'í', 'Enrollment Date', 'Address', 
    'Telephone', 'Email'
  ];
  
  const rows = individuals.map(ind => [
    ind.firstName || '',
    ind.familyName || '',
    ind.sex || '',
    ind.age || '',
    ind.dateOfBirth || '',
    ind.registered || '',
    ind.enrollmentDate || '',
    ind.address || '',
    ind.telephone || '',
    ind.email || ''
  ]);
  
  return convertToCSV([headers, ...rows]);
};

// Export children's classes to CSV
export const exportChildrenClassesToCSV = () => {
  const classes = getAllRecords(STORAGE_KEYS.childrenClasses);
  
  if (classes.length === 0) {
    return null;
  }
  
  const headers = [
    'Locality', 'Teachers', 'Grade', 'Start Date', 'End Date',
    'Total Participants', 'Bahá\'í Participants'
  ];
  
  const rows = classes.map(cls => [
    cls.locality || '',
    cls.teachers || '',
    cls.grade || '',
    cls.startDate || '',
    cls.endDate || '',
    cls.totalParticipants || '',
    cls.bahaiParticipants || ''
  ]);
  
  return convertToCSV([headers, ...rows]);
};

// Export junior youth groups to CSV
export const exportJuniorYouthGroupsToCSV = () => {
  const groups = getAllRecords(STORAGE_KEYS.juniorYouthGroups);
  
  if (groups.length === 0) {
    return null;
  }
  
  const headers = [
    'Locality', 'Animators', 'Book', 'Start Date', 'End Date',
    'Total Participants', 'Bahá\'í Participants'
  ];
  
  const rows = groups.map(grp => [
    grp.locality || '',
    grp.animators || '',
    grp.book || '',
    grp.startDate || '',
    grp.endDate || '',
    grp.totalParticipants || '',
    grp.bahaiParticipants || ''
  ]);
  
  return convertToCSV([headers, ...rows]);
};

// Export study circles to CSV
export const exportStudyCirclesToCSV = () => {
  const circles = getAllRecords(STORAGE_KEYS.studyCircles);
  
  if (circles.length === 0) {
    return null;
  }
  
  const headers = [
    'Locality', 'Tutors', 'Book', 'Start Date', 'Completed Date',
    'Total Participants', 'Bahá\'í Participants'
  ];
  
  const rows = circles.map(circle => [
    circle.locality || '',
    circle.tutors || '',
    circle.book || '',
    circle.startDate || '',
    circle.completedDate || '',
    circle.totalParticipants || '',
    circle.bahaiParticipants || ''
  ]);
  
  return convertToCSV([headers, ...rows]);
};

// Convert array to CSV string
const convertToCSV = (dataArray) => {
  return dataArray.map(row => 
    row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',')
  ).join('\n');
};

// Download CSV file
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || generateFilename('sinsa-srp-export', 'csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export all data (JSON format)
export const exportAllData = () => {
  const data = exportToJSON();
  downloadJSON(data, generateFilename('sinsa-srp-full-export'));
};

// Export specific data type
export const exportDataType = (dataType) => {
  let csvContent;
  let filename;
  
  switch (dataType) {
    case 'localities':
      csvContent = exportLocalitiesToCSV();
      filename = generateFilename('sinsa-srp-localities', 'csv');
      break;
    case 'individuals':
      csvContent = exportIndividualsToCSV();
      filename = generateFilename('sinsa-srp-individuals', 'csv');
      break;
    case 'childrenClasses':
      csvContent = exportChildrenClassesToCSV();
      filename = generateFilename('sinsa-srp-children-classes', 'csv');
      break;
    case 'juniorYouthGroups':
      csvContent = exportJuniorYouthGroupsToCSV();
      filename = generateFilename('sinsa-srp-junior-youth-groups', 'csv');
      break;
    case 'studyCircles':
      csvContent = exportStudyCirclesToCSV();
      filename = generateFilename('sinsa-srp-study-circles', 'csv');
      break;
    default:
      console.error('Invalid data type for export');
      return;
  }
  
  if (csvContent) {
    downloadCSV(csvContent, filename);
  } else {
    alert(`No ${dataType} data to export`);
  }
};
