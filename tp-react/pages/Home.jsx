import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch';
import Button from '../Components/Button/Button'; // Importamos el componente Button
import Tittle from '../Components/Tittle/Tittle';
import MovieList from '../Components/MovieList/MovieList';
import DetalleMovie from '../Components/DetalleMovie/DetalleMovie';
import Filter from '../Components/Filter/Filter';
import FormularioModal from '../Components/FormularioAgregarModificar/FormularioAgregarModificar';

import defaultMovies from '../data/DefaultMovies';

// Si no hay películas en el localStorage, cargamos las predeterminadas
if (!localStorage.getItem('peliculas')) {
  localStorage.setItem('peliculas', JSON.stringify(defaultMovies));
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('peliculas');
    return stored ? JSON.parse(stored) : [];
  });

  const [movieSeleccionada, setMovieSeleccionada] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sortField, setSortField] = useState(''); // 'year' o 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' o 'desc'
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

  //////////////////////////////////Logica de los filtros//////////////////////////////////////////////
  const [selectedGenres, setSelectedGenres] = useState([]); //   
  const [selectedType, setSelectedType] = useState([]);

  // Cambios de tipos
  const handleTypeChange = (tipo) => {
    setSelectedType((prev) => {
      if (prev.includes(tipo)) {
        return prev.filter((t) => t !== tipo);
      } else {
        return [...prev, tipo];
      }
    });
  };

// Cambio de géneros
const handleGenreChange = (genre) => {
  setSelectedGenres((prev) => {
    if (prev.includes(genre)) {
      return prev.filter((g) => g !== genre); // Si ya está seleccionado, lo saca
    } else {
      return [...prev, genre]; // Si no está seleccionado, lo agrego
    }
  });
};

 // Aplicar filtro dinámico sin modificar movies directamente
 const filteredMovies = movies.filter(movie => {
  const matchesType = selectedType.length === 0 || selectedType.includes(movie.tipo);
  const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genero);
  return matchesType && matchesGenre;
});

//console.log("Películas filtradas:", filteredMovies);

const WatchedMovie = filteredMovies.filter(movie => movie.visto === true);
const UnwatchedMovie = filteredMovies.filter(movie => movie.visto === false);

//////////////////////////////////////////////////////////////////////////////////////


  const sortedMovies = [...movies].sort((a, b) => {
    if (!sortField) return 0;
  
    const fieldA = a[sortField];
    const fieldB = b[sortField];
  
    if (sortOrder === 'asc') {
      return fieldA - fieldB;
    } else {
      return fieldB - fieldA;
    }
  });
  
  return (
    <div className={Style.homeContainer}>
      {/* Header con título y buscador */}
      <div className={Style.header}>
        <Tittle name="Nerdflix" />
        {/* <InputSearch
          movies={movies}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        /> */}
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
      <div className={Style.underNavbar}>
  <InputSearch
    movies={movies}
    searchTerm={searchTerm}
    onSearchChange={setSearchTerm}
  />

  <div className={Style.sortContainer}>
    <label>Ordenar por:</label>
    <select
      value={sortField}
      onChange={(e) => setSortField(e.target.value)}
    >
      <option value="">-- Seleccionar --</option>
      <option value="year">Año</option>
      <option value="rating">Rating</option>
    </select>

    <label>Orden:</label>
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  </div>
</div>

{/* Si hay búsqueda, mostramos solo los resultados */}
{searchTerm ? (
  <div className={Style.searchResults}>
    {/* Se muestra SearchResults desde el input */}
  </div>
) : sortField ? (
  <SortedResults
    movies={sortedMovies}
    onMovieClick={(movie) => verDetalleMovie(movie)}
  />
) : (
  <>
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
      <div className={Style.filterPanel}>
      <Filter
      movies={movies}
      selectedGenres={selectedGenres}
      onGenreChange={handleGenreChange}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      />
      </div>
    </div>
  </>
)}
      {/* Footer */}
      <div className={Style.footer}>
        <span>© 2025 NERDFLIX. Todos los derechos reservados.</span>
      </div>
    </div>
  );
};

export default Home;
