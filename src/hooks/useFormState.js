import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state
 * @param {Object} initialState - Initial form values
 * @returns {Object} - Form state and handlers
 */
const useFormState = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  // Handle input change
  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle nested object change (e.g., address.street)
  const handleNestedChange = useCallback((parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
    setIsDirty(true);
  }, []);

  // Batch update multiple fields
  const updateFields = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
    setIsDirty(true);
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setIsDirty(false);
  }, [initialState]);

  // Reset to new values (useful when editing existing records)
  const setForm = useCallback((newData) => {
    setFormData(newData);
    setErrors({});
    setIsDirty(false);
  }, []);

  // Validate form
  const validate = useCallback((validationRules) => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = formData[field];

      // Required validation
      if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field] = rules.message || `${field} is required`;
      }

      // Min length validation
      if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = rules.message || `${field} must be at least ${rules.minLength} characters`;
      }

      // Max length validation
      if (rules.maxLength && value && value.length > rules.maxLength) {
        newErrors[field] = rules.message || `${field} must be no more than ${rules.maxLength} characters`;
      }

      // Pattern validation (regex)
      if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || `${field} format is invalid`;
      }

      // Custom validation function
      if (rules.validate && typeof rules.validate === 'function') {
        const error = rules.validate(value, formData);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Set specific error
  const setError = useCallback((field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isDirty,
    handleChange,
    handleNestedChange,
    updateFields,
    resetForm,
    setForm,
    validate,
    setError,
    clearErrors
  };
};

export default useFormState;