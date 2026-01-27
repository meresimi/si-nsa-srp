// Validation utilities for SI-NSA SRP

import { VALIDATION_MESSAGES } from './constants';

// Check if value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// Validate required field
export const validateRequired = (value, fieldName = 'Field') => {
  if (isEmpty(value)) {
    return {
      isValid: false,
      error: `${fieldName} ${VALIDATION_MESSAGES.REQUIRED.toLowerCase()}`
    };
  }
  return { isValid: true, error: null };
};

// Validate email
export const validateEmail = (email) => {
  if (isEmpty(email)) {
    return { isValid: true, error: null }; // Email is optional
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_EMAIL
    };
  }
  
  return { isValid: true, error: null };
};

// Validate phone number
export const validatePhone = (phone) => {
  if (isEmpty(phone)) {
    return { isValid: true, error: null }; // Phone is optional
  }
  
  // Basic phone validation (digits, spaces, dashes, parentheses, plus sign)
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_PHONE
    };
  }
  
  return { isValid: true, error: null };
};

// Validate date
export const validateDate = (date) => {
  if (isEmpty(date)) {
    return { isValid: true, error: null }; // Date might be optional
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_DATE
    };
  }
  
  return { isValid: true, error: null };
};

// Validate age
export const validateAge = (age) => {
  if (isEmpty(age)) {
    return { isValid: true, error: null }; // Age might be calculated from DOB
  }
  
  const ageNum = Number(age);
  
  if (isNaN(ageNum)) {
    return {
      isValid: false,
      error: 'Age must be a number'
    };
  }
  
  if (ageNum < 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.MIN_AGE
    };
  }
  
  if (ageNum > 150) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.MAX_AGE
    };
  }
  
  return { isValid: true, error: null };
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth) => {
  if (isEmpty(dateOfBirth)) return null;
  
  const dob = new Date(dateOfBirth);
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

// Validate participants count
export const validateParticipants = (total, bahai) => {
  const totalNum = Number(total);
  const bahaiNum = Number(bahai);
  
  if (isNaN(totalNum) || totalNum < 0) {
    return {
      isValid: false,
      error: 'Total participants must be a positive number'
    };
  }
  
  if (isNaN(bahaiNum) || bahaiNum < 0) {
    return {
      isValid: false,
      error: 'Bahá\'í participants must be a positive number'
    };
  }
  
  if (bahaiNum > totalNum) {
    return {
      isValid: false,
      error: 'Bahá\'í participants cannot exceed total participants'
    };
  }
  
  return { isValid: true, error: null };
};

// Validate locality form
export const validateLocalityForm = (formData) => {
  const errors = {};
  
  // Required fields
  const requiredFields = ['date', 'region', 'cluster', 'locality'];
  
  requiredFields.forEach(field => {
    const validation = validateRequired(formData[field], field);
    if (!validation.isValid) {
      errors[field] = validation.error;
    }
  });
  
  // Conditional validations
  if (formData.observesFeast === 'Yes') {
    const attendees = Number(formData.feastAttendees);
    if (isNaN(attendees) || attendees < 0) {
      errors.feastAttendees = 'Please enter a valid number of attendees';
    }
  }
  
  if (formData.observesHolyDays === 'Yes') {
    const attendees = Number(formData.holyDayAttendees);
    if (isNaN(attendees) || attendees < 0) {
      errors.holyDayAttendees = 'Please enter a valid number of attendees';
    }
  }
  
  if (formData.hasDevotionals === 'Yes') {
    const meetings = Number(formData.devotionalMeetings);
    const participants = Number(formData.devotionalParticipants);
    const friends = Number(formData.friendsOfFaith);
    
    if (isNaN(meetings) || meetings < 0) {
      errors.devotionalMeetings = 'Please enter a valid number';
    }
    if (isNaN(participants) || participants < 0) {
      errors.devotionalParticipants = 'Please enter a valid number';
    }
    if (isNaN(friends) || friends < 0) {
      errors.friendsOfFaith = 'Please enter a valid number';
    }
  }
  
  if (formData.conductsHomeVisits === 'Yes') {
    const homes = Number(formData.homesVisited);
    if (isNaN(homes) || homes < 0) {
      errors.homesVisited = 'Please enter a valid number';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate individual form
export const validateIndividualForm = (formData) => {
  const errors = {};
  
  // Required fields
  const firstNameValidation = validateRequired(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error;
  }
  
  const sexValidation = validateRequired(formData.sex, 'Sex');
  if (!sexValidation.isValid) {
    errors.sex = sexValidation.error;
  }
  
  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  // Phone validation
  const phoneValidation = validatePhone(formData.telephone);
  if (!phoneValidation.isValid) {
    errors.telephone = phoneValidation.error;
  }
  
  // Age validation
  if (formData.age) {
    const ageValidation = validateAge(formData.age);
    if (!ageValidation.isValid) {
      errors.age = ageValidation.error;
    }
  }
  
  // Date of birth validation
  if (formData.dateOfBirth) {
    const dobValidation = validateDate(formData.dateOfBirth);
    if (!dobValidation.isValid) {
      errors.dateOfBirth = dobValidation.error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate activity form (Children's Class, Junior Youth Group, Study Circle)
export const validateActivityForm = (formData, activityType) => {
  const errors = {};
  
  // Required fields common to all activities
  const localityValidation = validateRequired(formData.locality, 'Locality');
  if (!localityValidation.isValid) {
    errors.locality = localityValidation.error;
  }
  
  const startDateValidation = validateDate(formData.startDate);
  if (!startDateValidation.isValid) {
    errors.startDate = startDateValidation.error;
  }
  
  // Participants validation
  if (formData.totalParticipants || formData.bahaiParticipants) {
    const participantsValidation = validateParticipants(
      formData.totalParticipants,
      formData.bahaiParticipants
    );
    if (!participantsValidation.isValid) {
      errors.participants = participantsValidation.error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generic form validator
export const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    const validation = validateRequired(formData[field], field);
    if (!validation.isValid) {
      errors[field] = validation.error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};