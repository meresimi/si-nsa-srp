// Constants for SI-NSA SRP Application

// Storage keys
export const STORAGE_KEYS = {
  localities: 'sinsa_localities',
  individuals: 'sinsa_individuals',
  childrenClasses: 'sinsa_children_classes',
  juniorYouthGroups: 'sinsa_junior_youth_groups',
  studyCircles: 'sinsa_study_circles',
  settings: 'sinsa_settings',
  backup: 'sinsa_backup'
};

// Age categories based on SRP 3.1 Reference Guide
export const AGE_CATEGORIES = {
  CHILD: { min: 0, max: 11, label: 'Child' },
  JUNIOR_YOUTH: { min: 12, max: 14, label: 'Junior Youth' },
  YOUTH: { min: 15, max: 20, label: 'Youth' },
  ADULT: { min: 21, max: 150, label: 'Adult' }
};

// Get age category from age
export const getAgeCategory = (age) => {
  if (age >= AGE_CATEGORIES.CHILD.min && age <= AGE_CATEGORIES.CHILD.max) {
    return AGE_CATEGORIES.CHILD.label;
  }
  if (age >= AGE_CATEGORIES.JUNIOR_YOUTH.min && age <= AGE_CATEGORIES.JUNIOR_YOUTH.max) {
    return AGE_CATEGORIES.JUNIOR_YOUTH.label;
  }
  if (age >= AGE_CATEGORIES.YOUTH.min && age <= AGE_CATEGORIES.YOUTH.max) {
    return AGE_CATEGORIES.YOUTH.label;
  }
  if (age >= AGE_CATEGORIES.ADULT.min) {
    return AGE_CATEGORIES.ADULT.label;
  }
  return 'Unknown';
};

// Children's Class Grades
export const CHILDREN_GRADES = [
  { id: 'G1', label: 'Grade 1', order: 1 },
  { id: 'G2', label: 'Grade 2', order: 2 },
  { id: 'G3', label: 'Grade 3', order: 3 },
  { id: 'G4', label: 'Grade 4', order: 4 },
  { id: 'G5', label: 'Grade 5', order: 5 },
  { id: 'G6', label: 'Grade 6', order: 6 }
];

// Junior Youth Books (based on Ruhi Institute materials)
export const JUNIOR_YOUTH_BOOKS = [
  { id: 'BC', label: 'Breezes of Confirmation', order: 1 },
  { id: 'WJ', label: 'Walking the Straight Path', order: 2 },
  { id: 'HO', label: 'Habits of an Orderly Mind', order: 3 },
  { id: 'GH', label: 'Glimmerings of Hope', order: 4 },
  { id: 'WS', label: 'Wind of the Holy Spirit', order: 5 },
  { id: 'HW', label: 'Human Temple', order: 6 },
  { id: 'LE', label: 'Learning about Excellence', order: 7 },
  { id: 'TN', label: 'Thinking about Numbers', order: 8 },
  { id: 'OI', label: 'Observation and Insight', order: 9 },
  { id: 'HT', label: 'Spirit of Faith', order: 10 },
  { id: 'DP', label: 'Drawing on the Power of the Word', order: 11 },
  { id: 'SF', label: 'The Human Temple', order: 12 },
  { id: 'PH', label: 'Power of the Holy Spirit', order: 13 }
];

// Ruhi Institute Books (Study Circles)
export const RUHI_BOOKS = [
  { id: 'Book1', label: 'Book 1: Reflections on the Life of the Spirit', order: 1 },
  { id: 'Book2', label: 'Book 2: Arising to Serve', order: 2 },
  { id: 'Book3', label: 'Book 3: Teaching Children\'s Classes, Grade 1', order: 3 },
  { id: 'Book4', label: 'Book 4: The Twin Manifestations', order: 4 },
  { id: 'Book5', label: 'Book 5: Releasing the Powers of Junior Youth', order: 5 },
  { id: 'Book6', label: 'Book 6: Teaching the Cause', order: 6 },
  { id: 'Book7', label: 'Book 7: Walking Together on a Path of Service', order: 7 },
  { id: 'Book8', label: 'Book 8: The Covenant of Bahá\'u\'lláh', order: 8 },
  { id: 'Book9', label: 'Book 9: Gaining an Historical Perspective', order: 9 },
  { id: 'Book10', label: 'Book 10: Building Vibrant Communities', order: 10 }
];

// Form types
export const FORM_TYPES = {
  LOCALITY: 'locality',
  INDIVIDUAL: 'individual',
  CHILDREN_CLASS: 'childrenClass',
  JUNIOR_YOUTH_GROUP: 'juniorYouthGroup',
  STUDY_CIRCLE: 'studyCircle'
};

// Activity status
export const ACTIVITY_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAUSED: 'paused'
};

// Sex options
export const SEX_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' }
];

// Yes/No options
export const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

// Registered Bahá'í options
export const REGISTERED_OPTIONS = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' }
];

// Export file types
export const EXPORT_TYPES = {
  JSON: 'json',
  CSV: 'csv',
  PDF: 'pdf'
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  TIMESTAMP: 'YYYY-MM-DD HH:mm:ss'
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE: 'Please enter a valid date',
  MIN_AGE: 'Age must be 0 or greater',
  MAX_AGE: 'Age must be 150 or less',
  MIN_PARTICIPANTS: 'Must have at least 1 participant'
};

// Application modes (for future phases)
export const APP_MODES = {
  CLUSTER: 'cluster',
  REGIONAL: 'regional',
  NATIONAL: 'national'
};

// Default values
export const DEFAULTS = {
  PARTICIPANTS: 0,
  BAHAI_PARTICIPANTS: 0,
  ATTENDEES: 0
};

// App metadata
export const APP_INFO = {
  NAME: 'SI-NSA SRP',
  VERSION: '1.0.0',
  DESCRIPTION: 'Systematic Regional Program Data Collection',
  AUTHOR: 'SI-NSA'
};