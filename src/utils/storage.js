// Storage utility functions for SI-NSA SRP

const STORAGE_VERSION = '1.0';

// Get item from localStorage with error handling
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return null;
  }
};

// Save item to localStorage with error handling
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to storage (${key}):`, error);
    return false;
  }
};

// Remove item from localStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
};

// Clear all storage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Get all records of a specific type
export const getAllRecords = (storageKey) => {
  const records = getFromStorage(storageKey);
  return Array.isArray(records) ? records : [];
};

// Save a new record
export const saveRecord = (storageKey, record) => {
  const records = getAllRecords(storageKey);
  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    version: STORAGE_VERSION,
    ...record
  };
  records.push(newRecord);
  return saveToStorage(storageKey, records) ? newRecord : null;
};

// Update an existing record
export const updateRecord = (storageKey, id, updates) => {
  const records = getAllRecords(storageKey);
  const index = records.findIndex(r => r.id === id);
  
  if (index === -1) {
    console.error(`Record with id ${id} not found`);
    return false;
  }
  
  records[index] = {
    ...records[index],
    ...updates,
    lastModified: new Date().toISOString()
  };
  
  return saveToStorage(storageKey, records);
};

// Delete a record
export const deleteRecord = (storageKey, id) => {
  const records = getAllRecords(storageKey);
  const filtered = records.filter(r => r.id !== id);
  return saveToStorage(storageKey, filtered);
};

// Get a single record by ID
export const getRecordById = (storageKey, id) => {
  const records = getAllRecords(storageKey);
  return records.find(r => r.id === id) || null;
};

// Search records
export const searchRecords = (storageKey, searchTerm) => {
  const records = getAllRecords(storageKey);
  const term = searchTerm.toLowerCase();
  
  return records.filter(record => {
    return Object.values(record).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      return false;
    });
  });
};

// Get storage statistics
export const getStorageStats = () => {
  const stats = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    stats[key] = {
      size: new Blob([value]).size,
      recordCount: (() => {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed.length : 1;
        } catch {
          return 1;
        }
      })()
    };
  }
  
  return stats;
};

// Export all data
export const exportAllData = () => {
  const allData = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    allData[key] = getFromStorage(key);
  }
  
  return {
    version: STORAGE_VERSION,
    exportDate: new Date().toISOString(),
    data: allData
  };
};

// Import data
export const importData = (importedData) => {
  try {
    if (!importedData || !importedData.data) {
      throw new Error('Invalid import data format');
    }
    
    Object.entries(importedData.data).forEach(([key, value]) => {
      saveToStorage(key, value);
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};