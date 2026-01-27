import React from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  options = [],
  placeholder = '',
  className = '',
  disabled = false
}) => {
  const baseInputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className={baseInputClass}
          required={required}
          disabled={disabled}
        >
          <option value="">Select...</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClass} min-h-20`}
          required={required}
          disabled={disabled}
        />
      ) : type === 'radio' ? (
        <div className="flex gap-4">
          {options.map((opt, idx) => (
            <label key={idx} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={opt.value || opt}
                checked={value === (opt.value || opt)}
                onChange={onChange}
                className="mr-2"
                required={required}
                disabled={disabled}
              />
              {opt.label || opt}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseInputClass}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default FormField;