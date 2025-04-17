import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch'; 
import Button from '../Components/Button/Button'; 
import MovieList from '../Components/MovieList/MovieList';
import DetalleMovie from '../Components/DetalleMovie/DetalleMovie.jsx';


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
  {
    titulo: 'Breaking Bad',
    director: 'Vince Gilligan',
    año: 2008,
    genero: 'Crimen, Drama, Suspenso',
    rating: 9.5,
    tipo: 'Serie',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/ineLOBPG8AZsluYwnkMpHRyu7L.jpg',
  },
  {
    titulo: 'Avatar: The Way of Water',
    director: 'James Cameron',
    año: 2022,
    genero: 'Acción, Aventura, Ciencia ficción',
    rating: 7.8,
    tipo: 'Película',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tXmTHdrZgNsULqCbThK2Dt2X9Wt.jpg',
  },
  {
    titulo: 'The Witcher',
    director: 'Lauren Schmidt Hissrich',
    año: 2019,
    genero: 'Aventura, Drama, Fantasía',
    rating: 8.1,
    tipo: 'Serie',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/gvn0m0LCIslrURjSo7UG5Rx6mV2.jpg',
  },
  {
    titulo: 'Guardians of the Galaxy Vol. 3',
    director: 'James Gunn',
    año: 2023,
    genero: 'Acción, Aventura, Ciencia ficción',
    rating: 8.0,
    tipo: 'Película',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/6GkKzdNosVAL7UGgwTtCHSxLQ67.jpg',
  },
  {
    titulo: 'The Mandalorian',
    director: 'Jon Favreau',
    año: 2019,
    genero: 'Acción, Aventura, Ciencia ficción',
    rating: 8.7,
    tipo: 'Serie',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/iLg3DzrwCDsHNovNaWx5JnQAsiV.jpg',
  },
  {
    titulo: 'Dune',
    director: 'Denis Villeneuve',
    año: 2021,
    genero: 'Ciencia ficción, Drama, Aventura',
    rating: 8.1,
    tipo: 'Película',
    visto: true,
    img: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/szcew6yyjcDvaL0isaPBk2e3nkF.jpg',
  }
];



    

const Home = () => {
  const [movies, setMovies] = useState(defaultMovies);
  const [movieSeleccionada, setMovieSeleccionada] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const agregarMovie = (nuevaMovie) => {
    setMovies([...movies, nuevaMovie]);
  };

  const verDetalleMovie = (movie) => {
    setMovieSeleccionada(movie);
    setMostrarDetalle(true);
  }

  const WatchedMovie = movies.filter((movie) => movie.visto === true);
const UnwatchedMovie = movies.filter((movie) => movie.visto === false);

  return (
    <div className={Style.homeContainer}>
      <div className={Style.header}>
        <div className={Style.logo}>NERDFLIX</div>
        <InputSearch />
        <Button onGuardar={agregarMovie}></Button>

        
        <DetalleMovie
        movies={movieSeleccionada}
        visible={mostrarDetalle}
        onClose={() => setMostrarDetalle(false)} 
      />

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
