// Counter.js
import Style from './Counter.module.css';

const Counter = ({ count, movies = [], genre, label }) => {
  let finalCount = 0;

  if (typeof count === 'number') { // Si count es un número, lo usamos directamente
    finalCount = count;
  } else if (genre) { // Si se da un género, contamos las películas de ese género
    finalCount = movies.filter(movie => movie.genero === genre).length; // Contamos las películas que tengan ese género
  } else {
    finalCount = movies.length; // Si no se da un género, contamos todas las películas
  }

  return (
    <span className={Style.Counter}>
      {label
        ? `${label}: ${finalCount} películas/series.` 
        : `(${finalCount})`} {/*Si no, solo mostramos el conteo entre paréntesis para los generos*/}
    </span>
  );
};

export default Counter;
