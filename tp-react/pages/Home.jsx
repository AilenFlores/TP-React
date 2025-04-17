import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch'; 
import Button from '../Components/Button/Button'; 
import Tittle from '../Components/Tittle/Tittle';
import MovieList from '../Components/MovieList/MovieList';
import DetalleMovie from '../Components/DetalleMovie/DetalleMovie.jsx';

import FilterGenre from '../Components/FilterGenre/FilterGenre';

import defaultMovies from '../data/DefaultMovies';

// Si no hay películas en el localStorage, cargamos las predeterminadas
if (!localStorage.getItem('peliculas')) {
  localStorage.setItem('peliculas', JSON.stringify(defaultMovies));
}

const Home = () => {
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('peliculas');
    return stored ? JSON.parse(stored) : [];
  });
  const [movieSeleccionada, setMovieSeleccionada] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const agregarMovie = (nuevaMovie) => {
    setMovies([...movies, nuevaMovie]);
  };

  const verDetalleMovie = (movie) => {
    setMovieSeleccionada(movie);
    setMostrarDetalle(true);
  }



  useEffect(() => {
    localStorage.setItem('peliculas', JSON.stringify(movies));
  }, [movies]);

  const WatchedMovie = movies.filter((movie) => movie.visto === true);
  const UnwatchedMovie = movies.filter((movie) => movie.visto === false);

  return (
    <div className={Style.homeContainer}>
      {/* Header con título y buscador */}
      <div className={Style.header}>
        <Tittle name="Nerdflix" />
        <InputSearch />

        <Button onGuardar={agregarMovie}></Button>

        <DetalleMovie
        movies={movieSeleccionada}
        visible={mostrarDetalle}
        onClose={() => setMostrarDetalle(false)} 
        />

      </div>

      {/* Contenedor principal: carruseles + filtros */}
      <div className={Style.contentWrapper}>
        <div className={Style.mainContent}>
          <MovieList
            text="Películas y Series que te podrían interesar..."
            movies={UnwatchedMovie}
            onMovieClick={(movie) => console.log(movie)}
          />
          <MovieList
            text="Películas y Series que has visto..."
            movies={WatchedMovie}
            onMovieClick={(movie) => console.log(movie)}
          />
        </div>

        {/* Filtros al costado */}
        <div className={Style.filterPanel}>
          <FilterGenre className={Style.filterGnre} movies={movies} count={3} />
        </div>
      </div>

      {/* Footer */}
      <div className={Style.footer}>
        <span>© 2023 NERDFLIX. Todos los derechos reservados.</span>
      </div>
    </div>
  );
};

export default Home;
