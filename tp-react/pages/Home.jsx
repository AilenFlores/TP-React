import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch';
import Button from '../Components/Button/Button'; // Importamos el componente Button
import Tittle from '../Components/Tittle/Tittle';
import MovieList from '../Components/MovieList/MovieList';
import DetalleMovie from '../Components/DetalleMovie/DetalleMovie';
import FilterGenre from '../Components/FilterGenre/FilterGenre';
import FormularioModal from '../Components/FormularioAgregarModificar/FormularioAgregarModificar';
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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarMovie = (nuevaMovie) => {
    const nuevoId = movies.length > 0
      ? Math.max(...movies.map((m) => m.id || 0)) + 1
      : 1;

    const movieConId = { ...nuevaMovie, id: nuevoId };
    setMovies([...movies, movieConId]);
  };

  const editarMovie = (peliculaEditada) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === peliculaEditada.id ? peliculaEditada : movie
    );
    setMovies(updatedMovies);
  };

  const eliminarMovie = (peliculaAEliminar) => {
    const nuevasMovies = movies.filter((movie) => movie.id !== peliculaAEliminar.id);
    setMovies(nuevasMovies);
    setMostrarDetalle(false); // Ocultamos el modal después de eliminar
  };  

  const verDetalleMovie = (movie) => {
    setMovieSeleccionada(movie);
    setMostrarDetalle(true);
  };

  const abrirFormularioAgregar = () => {
    setMovieSeleccionada(null); // modo agregar
    setMostrarFormulario(true);
  };

  const abrirFormularioEdicion = (movie) => {
    setMovieSeleccionada(movie);
    setMostrarDetalle(false);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

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
        <Button onClick={abrirFormularioAgregar} className="modificar">
          Agregar Película/Serie
        </Button>

        {/* Detalle de la película seleccionada */}
        <DetalleMovie
          movie={movieSeleccionada}
          visible={mostrarDetalle}
          onClose={() => setMostrarDetalle(false)}
          onEditar={editarMovie}
          onEditarClick={abrirFormularioEdicion}
          onEliminar={eliminarMovie}
        />

        {/* Formulario para agregar o editar */}
        <FormularioModal
          visible={mostrarFormulario}
          onClose={cerrarFormulario}
          onGuardar={movieSeleccionada ? editarMovie : agregarMovie}
          movie={movieSeleccionada}
          peliculas={movies}
        />
      </div>

      {/* Contenedor principal: carruseles + filtros */}
      <div className={Style.contentWrapper}>
        <div className={Style.mainContent}>
          <MovieList
            text="Películas y Series que te podrían interesar..."
            movies={UnwatchedMovie}
            onMovieClick={(movie) => verDetalleMovie(movie)}
          />
          <MovieList
            text="Películas y Series que has visto..."
            movies={WatchedMovie}
            onMovieClick={(movie) => verDetalleMovie(movie)}
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
