import React from 'react';
import Counter from '../Counter/Counter';
import MovieCarousel from '../MovieCarrusel/MovieCarrusel';
import Style from './MovieList.module.css';

const MovieList = ({ text, movies, onMovieClick }) => {
  return (
    <div className={Style.movieList}>
      <div className={Style.section}>
        <div className={Style.sectionHeader}>
          <span className={Style.leftTitle}>{text}</span>
          <span className={Style.rightTitle}>
            <Counter count={movies.length} />
          </span>
        </div>
        
        {/* Condicional: Si hay películas, mostrar el carrusel, si no, mostrar el mensaje */}
        {movies.length > 0 ? (
          <MovieCarousel movies={movies} onMovieClick={onMovieClick} />
        ) : (
          <div className={Style.noMoviesMessage}>
            <span>No hay películas disponibles por el momento.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
