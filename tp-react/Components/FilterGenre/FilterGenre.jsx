import React from 'react';
import Style from './FilterGenre.module.css';

const FilterGenre = ({ movies }) => {
  // Crear un Set para que los géneros no se repitan
  const unicos = [...new Set(movies.map(movie => movie.genero))];
  return (
    <div className={Style.container}>
      <h5>Géneros: </h5>
      {unicos.map((genre, index) => (
        <label key={index}>
          <input type="checkbox" />
          {' '}{genre}
        </label>
      ))}
    </div>
  );
};

export default FilterGenre;
