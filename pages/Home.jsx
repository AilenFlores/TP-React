import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import InputSearch from '../Components/InputSearch/InputSearch';
import Button from '../Components/Button/Button'; 
import Tittle from '../Components/Tittle/Tittle';
import MovieList from '../Components/MovieList/MovieList';
import DetalleMovie from '../Components/DetalleMovie/DetalleMovie';
import Filter from '../Components/Filter/Filter';
import FormularioModal from '../Components/FormularioAgregarModificar/FormularioAgregarModificar';
import MoviesOrder from '../Components/MoviesOrder/MoviesOrder';
import defaultMovies from '../data/DefaultMovies';

// Si no hay películas en el localStorage, cargamos las predeterminadas
if (!localStorage.getItem('peliculas')) {
  localStorage.setItem('peliculas', JSON.stringify(defaultMovies));
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieSeleccionada, setMovieSeleccionada] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [selectedGenres, setSelectedGenres] = useState([]); //   
  const [selectedType, setSelectedType] = useState([]);

  const [sortField, setSortField] = useState(''); // 'year' o 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' o 'desc'

  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('peliculas');
    return stored ? JSON.parse(stored) : [];
  });

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
    setMostrarDetalle(false); 
  };  

  const verDetalleMovie = (movie) => {
    setMovieSeleccionada(movie);
    setMostrarDetalle(true);
  };

  const abrirFormularioAgregar = () => {
    setMovieSeleccionada(null); 
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


  const handleTypeChange = (tipo) => {
    setSelectedType((prev) => {
      if (prev.includes(tipo)) {
        return prev.filter((t) => t !== tipo);
      } else {
        return [...prev, tipo];
      }
    });
  };

const handleGenreChange = (genre) => {
  setSelectedGenres((prev) => {
    if (prev.includes(genre)) {
      return prev.filter((g) => g !== genre);
    } else {
      return [...prev, genre]; 
    }
  });
};



const [filteredMovies, setFilteredMovies] = useState([]);
useEffect(() => {
  // 1: Filtrar por género y tipo
  let filtradas = movies.filter(movie => {
    const matchesType = selectedType.length === 0 || selectedType.includes(movie.tipo);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genero);
    return matchesType && matchesGenre;
  });

  // 2: Filtrar por búsqueda
  if (searchTerm.trim() !== '') {
    filtradas = filtradas.filter(movie =>
      movie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Ordenar
  if (sortField) {
    filtradas.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
  
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
  
      return sortOrder === 'asc'
        ? fieldA - fieldB
        : fieldB - fieldA;
    });
  }
  
  setFilteredMovies(filtradas);
}, [movies, selectedGenres, selectedType, searchTerm, sortField, sortOrder]);

const WatchedMovie = filteredMovies.filter(movie => movie.visto === true);
const UnwatchedMovie = filteredMovies.filter(movie => movie.visto === false);

  return (
    <div className={Style.homeContainer}>
      <div className={Style.header}>
        <Tittle name="Nerdflix" />
  
        <Button onClick={abrirFormularioAgregar} className="modificar">
          Agregar Película/Serie
        </Button>

        <DetalleMovie
          movie={movieSeleccionada}
          visible={mostrarDetalle}
          onClose={() => setMostrarDetalle(false)}
          onEditar={editarMovie}
          onEditarClick={abrirFormularioEdicion}
          onEliminar={eliminarMovie}
        />
        
        <FormularioModal
          visible={mostrarFormulario}
          onClose={cerrarFormulario}
          onGuardar={movieSeleccionada ? editarMovie : agregarMovie}
          movie={movieSeleccionada}
          peliculas={movies}
        />
      </div>

      <div className={Style.underNavbar}>
        <InputSearch searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
        <div className={Style.orderWrapper}>
        <MoviesOrder
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder} />
        </div>
      
      </div>

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
     
      <div className={Style.filterWrapper}>
        <Filter
        movies={movies}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        />
      </div>
    </div>

      <div className={Style.footer}>
        <span>© 2025 NERDFLIX. Todos los derechos reservados.</span>
      </div>
    </div>
  );
};

export default Home;
