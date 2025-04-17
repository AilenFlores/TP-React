import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch'; 
import Button from '../Components/Button/Button'; 
import Tittle from '../Components/Tittle/Tittle';
import MovieList from '../Components/MovieList/MovieList';

const defaultMovies = [
  {
    titulo: 'The Last of Us',
    director: 'Craig Mazin, Neil Druckmann',
    año: 2023,
    genero: 'Drama, Aventura, Terror',
    rating: 9.2,
    tipo: 'Serie',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tNQWO6cNzQYCyvw36mUcAQQyf5F.jpg',
  },
  {
    titulo: 'Spider-Man: No Way Home',
    director: 'Jon Watts',
    año: 2021,
    genero: 'Acción, Aventura, Ciencia ficción',
    rating: 8.7,
    tipo: 'Película',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/miZFgV81xG324rpUknQX8dtXuBl.jpg',
  },
  {
    titulo: 'Stranger Things',
    director: 'The Duffer Brothers',
    año: 2016,
    genero: 'Drama, Terror, Ciencia ficción',
    rating: 8.8,
    tipo: 'Serie',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
  },
];

// Verificar si ya hay películas en el localStorage, si no, agregar las predeterminadas
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


  const WatchedMovie = movies.filter((movie) => movie.visto === true);
  const UnwatchedMovie = movies.filter((movie) => movie.visto === false);

  return (
    <div className={Style.homeContainer}>

      <div className={Style.header}>
        <Tittle name="Nerdflix"></Tittle>
        <InputSearch />
        <Button/>
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
