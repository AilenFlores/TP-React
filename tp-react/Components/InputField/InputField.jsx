import React from 'react';
import './InputField.css';

function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="input-field">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Ingresa ${label}`}
      />
    </div>
  );
}

export default InputField;
