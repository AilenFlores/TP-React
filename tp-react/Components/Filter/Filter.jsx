import React from 'react';
import Style from './Filter.module.css';
import Counter from '../Counter/Counter';

const Filter = ({ movies, selectedGenres, onGenreChange, selectedType, onTypeChange }) => {
  const unicos = [...new Set(movies.map(movie => movie.genero))];

  return (
    <div className={Style.container}>
      <h3>Filtros</h3>
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

      {/* ckeckbox para Tipo*/}
      <h5>Tipo:</h5>
      {/* Contadores por tipo */}
      {(() => {
        const peliculaCount = movies.filter(movie => movie.tipo === 'Pelicula').length;
        const serieCount = movies.filter(movie => movie.tipo === 'Serie').length;
        return (
    <>
      <label>
        <input
          type="checkbox"
          checked={selectedType.includes('Pelicula')}
          onChange={() => onTypeChange('Pelicula')}
        />
        Películas <Counter count={peliculaCount} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={selectedType.includes('Serie')}
          onChange={() => onTypeChange('Serie')}
        />
        Series <Counter count={serieCount} />
      </label>
    </>
  );
})()}
    </div>
  );
};

export default Filter;
