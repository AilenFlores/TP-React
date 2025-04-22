import React from 'react';
import Style from './FilterGenre.module.css';
import Counter from '../Counter/Counter';

const FilterGenre = ({ movies, selectedGenres, onGenreChange, selectedType, onTypeChange }) => {
  const unicos = [...new Set(movies.map(movie => movie.genero))];

  return (
    <div className={Style.container}>
      <h5>Géneros:</h5>
      {unicos.map((genre, index) => {
        const count = movies.filter(movie => movie.genero === genre).length;
        const checked = selectedGenres.includes(genre); //include verifica si el género está seleccionado
        return (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onGenreChange(genre)}
            />
            {genre} <Counter count={count} />
          </label>
        );
      })}

      {/* Radio Buttons para Tipo*/}
      <div>
        <h5>Tipo:</h5>
        <label>
          <input
            type="radio"
            value="Pelicula"
            checked={selectedType === 'Pelicula'}
            onChange={onTypeChange}
          />
          Película
        </label>
        <label>
          <input
            type="radio"
            value="Serie"
            checked={selectedType === 'Serie'}
            onChange={onTypeChange}
          />
          Serie
        </label>
      </div>
    </div>
  );
};

export default FilterGenre;
