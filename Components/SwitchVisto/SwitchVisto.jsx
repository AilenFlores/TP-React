import React from 'react';
import './SwitchVisto.css';

function SwitchVisto({ visto, onChange }) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={visto}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
      <span className="estado">{visto ? 'Visto' : 'No visto'}</span>
    </div>
  );
}

export default SwitchVisto;
