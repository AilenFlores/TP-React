import React from 'react';
import './SelectField.css';

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="select-field">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder || `Seleccioná ${label.toLowerCase()}`}</option>
        {options.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
