import React from 'react';
import Style from './InputSearch.module.css';
// import MovieCardSimple from '../MovieCardSimple/MovieCardSimple';

const InputSearch = ({ searchTerm, onSearchChange }) => {
  

  return (
    <div className={Style.inputSearchContainer}>
      <input
        type="text"
        placeholder="Buscar películas o series..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={Style.inputField}
      />

      
    </div>
  );
};

export default InputSearch;
