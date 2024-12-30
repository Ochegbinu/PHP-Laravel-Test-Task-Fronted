// src/components/ui/Input.js
import React from 'react';

const InputField = ({ label, id, type = 'text', className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;
