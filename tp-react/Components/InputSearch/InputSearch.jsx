import React from 'react';
import Style from './InputSearch.module.css';
import MovieCardSimple from '../MovieCardSimple/MovieCardSimple';

const InputSearch = ({ movies, searchTerm, onSearchChange }) => {
  const filteredMovies = movies.filter((movie) =>
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={Style.inputSearchContainer}>
      <input
        type="text"
        placeholder="Buscar películas o series..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={Style.inputField}
      />

      {searchTerm && (
        <div className={Style.resultContainer}>
          {filteredMovies.length > 0 ? (
            <div className={Style.resultList}>
            {filteredMovies.map((movie) => (
                <div className={Style.movieResultsContainer}> {/* Contenedor de las películas */}
                  <MovieCardSimple key={movie.id} movie={movie} />
                </div>
            ))}
          </div>
          
          ) : (
            <p className={Style.noResults}>No se encontraron coincidencias.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
