import React, { useRef } from 'react';
import Style from './MovieCarrusel.module.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieCarousel = ({ movies, onMovieClick }) => {

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' }); 
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
  };

  return (
    <div className={Style.carouselWrapper}>
      {movies.length > 4 && (
        <button className={`${Style.arrow} ${Style.left}`} onClick={scrollLeft}>
          &#8592;
        </button>
      )}

      <div className={Style.cardContainer} ref={scrollRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.titulo}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>

      {movies.length > 4 && (
        <button className={`${Style.arrow} ${Style.right}`} onClick={scrollRight}>
          &#8594;
        </button>
      )}
    </div>
  );
};

export default MovieCarousel;
