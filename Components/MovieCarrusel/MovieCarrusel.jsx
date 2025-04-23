import React, { useRef } from 'react';
import Style from './MovieCarrusel.module.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieCarousel = ({ movies, onMovieClick }) => {

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' }); // Cambia el valor de desplazamiento a la izquierda
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' }); // Cambia el valor de desplazamiento a la derecha
  };

  return (
    <div className={Style.carouselWrapper}>
      {/* Flecha izquierda visible al costado si hay 5+ pelis */}
      {movies.length > 4 && (
        <button className={`${Style.arrow} ${Style.left}`} onClick={scrollLeft}>
          &#8592;
        </button>
      )}

      {/* Contenedor de tarjetas que tienen peliculas */}
      <div className={Style.cardContainer} ref={scrollRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.titulo}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>

      {/* Flecha derecha visible al costado si hay 5+ pelis */}
      {movies.length > 4 && (
        <button className={`${Style.arrow} ${Style.right}`} onClick={scrollRight}>
          &#8594;
        </button>
      )}
    </div>
  );
};

export default MovieCarousel;
