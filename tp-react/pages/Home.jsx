import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch'; 
import Button from '../Components/Button/Button'; 
import MovieList from '../Components/MovieList/MovieList';

import defaultMovies from '../data/defaultMovies'; // Importar el archivo con las películas
// Solo si no hay nada guardado aún en localStorage se inicializa con defaultMovies
if (!localStorage.getItem('peliculas')) {
  localStorage.setItem('peliculas', JSON.stringify(defaultMovies));
}

const Home = () => {
  // Estado para almacenar las películas
  const [movies, setMovies] = useState(() => {
    // Obtener las películas del localStorage al cargar el componente
    const stored = localStorage.getItem('peliculas');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => { 
    localStorage.setItem('peliculas', JSON.stringify(movies)); // Guardar las películas en localStorage cada vez que cambian
  }, [movies]);


  const WatchedMovie = defaultMovies.filter((movie) => movie.visto === true);
  const UnwatchedMovie = defaultMovies.filter((movie) => movie.visto === false);

  return (
    <div className={Style.homeContainer}>
      <div className={Style.header}>
        <div className={Style.logo}>NERDFLIX</div>
        <InputSearch />
        <Button></Button>
      </div>
      <MovieList text="Películas y Series que te podrían interesar..." movies={UnwatchedMovie} onMovieClick={(movie) => console.log(movie)} />
      <MovieList text="Peliculas y Series que has visto..." movies={WatchedMovie} onMovieClick={(movie) => console.log(movie)} />

      <div className={Style.footer}>
        <span>© 2023 NERDFLIX. Todos los derechos reservados.</span>
      </div>
    </div>
  );
};

export default Home;
