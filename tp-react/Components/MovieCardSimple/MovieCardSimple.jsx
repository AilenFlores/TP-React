import React from 'react';
import Style from './MovieCardSimple.module.css'; // Estilos para esta card

const MovieCardSimple = ({ movie }) => {
  const { titulo, director, año, genero, img } = movie;

  return (
    <div className={Style.cardContainer}>
      <img src={img} alt={titulo} className={Style.image} />

      <div className={Style.textContent}>
        <h3 className={Style.title}>{titulo}</h3>
        <p><strong>Director:</strong> {director}</p>
        <p><strong>Año:</strong> {año}</p>
        <p><strong>Género:</strong> {genero}</p>
      </div>
    </div>
  );
};

export default MovieCardSimple;
