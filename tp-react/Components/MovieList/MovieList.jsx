import Style from './MovieList.module.css'; // Asegúrate de que este archivo exista y tenga los estilos

const MovieList = ({ text, movies, onMovieClick }) => {
  return (
    <div className={Style.movieList}>
      <div className={Style.section}>
        <div className={Style.sectionHeader}>
          <span className={Style.leftTitle}>
            {text}
          </span>
          <span className={Style.rightTitle}>
          Cantidad {movies.length} películas/series.
          </span>
        </div>

        <div className={Style.cardContainer}>
          {movies.map((movie) => (
            <div className={Style.card} onClick={() => onMovieClick(movie)} > 
              <img src={movie.img} alt={movie.title} className={Style.moviePoster} />
              <h2 className={Style.movieTitle}>{movie.titulo}</h2>
              <h2 className={Style.movieTitle}>{"Categoria: " } {movie.tipo}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
