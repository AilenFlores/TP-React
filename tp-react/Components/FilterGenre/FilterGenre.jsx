import React from 'react';
import Style from './FilterGenre.module.css';
import Counter from '../Counter/Counter';

const FilterGenre = ({ movies }) => {
  const unicos = [...new Set(movies.map(movie => movie.genero))];

  return (
    <div className={Style.container}>
      <h5>Géneros: </h5>
      {unicos.map((genre, index) => {
        const count = movies.filter(movie => movie.genero === genre).length; // cantidad de peliculas por género
        return (
          <label key={index}>
            <input type="checkbox" />
            {' '}{genre} <Counter count={count} />
          </label>
        );
      })}
    </div>
  );
};

export default FilterGenre;

