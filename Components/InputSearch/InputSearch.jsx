import React from 'react';
import Style from './InputSearch.module.css';

const InputSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className={Style.inputSearchContainer}>
      <div className={Style.inputWrapper}>
        <input
          type="text"
          placeholder="Buscar películas o series..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={Style.inputField}
        />
      </div>
    </div>
  );
};

export default InputSearch;
