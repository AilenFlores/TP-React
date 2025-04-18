import React from 'react';
import Style from './MovieCard.module.css';

const MovieItem = ({ movie, onMovieClick }) => {
  // Verificar si 'imagen' es un objeto o una URL de imagen
  const rawImage = movie.imagen || movie.img;

  const imageSrc =
  typeof rawImage === 'string'
    ? rawImage
    : rawImage?.src || rawImage?.default;

  return (
    <div className={Style.card} onClick={() => onMovieClick(movie)}>
      {imageSrc && <img src={imageSrc} alt={movie.titulo} className={Style.moviePoster} />}
      <div className={Style.movieOverlay}>
        <h2 className={Style.movieTitle}>{movie.titulo}</h2>
        <h3 className={Style.movieTitle}>Categoría: {movie.tipo}</h3>
        <h3 className={Style.movieTitle}>Director: {movie.director}</h3>
      </div>
    </div>
  );
};

export default MovieItem;
