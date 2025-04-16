import React from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch'; 
import Button from '../Components/Button/Button'; // Importa el componente Button
import MovieList from '../Components/MovieList/MovieList';

const Movies = [
    {
      titulo: 'Movie 1',
      director: 'Director 1',
      año: 2023,
      genero: 'Action',
      rating: 8.5,
      tipo: 'Pelicula',
      visto: true,
      img: 'https://placehold.co/200x240/blue/white',
    },
    {
        titulo: 'Movie No vista 2',
        director: 'Director 2',
        año: 2022,
        genero: 'Drama',
        rating: 7.5,
        tipo: 'Serie',
        visto: false,
        img: 'https://placehold.co/200x240/green/white',
    },
    {
        titulo: 'Movie No vista 3',
        director: 'Director 2',
        año: 2022,
        genero: 'Drama',
        rating: 7.5,
        tipo: 'Pelicula',
        visto: false,
        img: 'https://placehold.co/200x240/red/white',
    },
  ];
  
const WatchedMovie = Movies.filter((movie) => movie.visto === true);
const UnwatchedMovie = Movies.filter((movie) => movie.visto === false);  

const Home = () => {
  return (
    <div className={Style.homeContainer}>
      {/* Encabezado*/}
      <div className={Style.header}>
        <div className={Style.logo}>NERDFLIX</div> {/*logo que deberia ser componente*/}
        <InputSearch/>{/*componente de busqueda*/}
        <Button > </Button>{/*boton de agregar pelicula*/}
      </div>

        {/* Sección de películas y series recomendadas */}
      <MovieList text ={"Películas y Series que te podrían interesar..."} movies={UnwatchedMovie} onMovieClick={(movie) => console.log(movie)} />
         {/* Lista de películas no vistas */}
      <MovieList text={"Peliculas y Series que has visto..."} movies={WatchedMovie}  onMovieClick={(movie) => console.log(movie)} />
   

    </div>
  );
};

export default Home;
