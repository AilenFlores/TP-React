import React from 'react';
import MovieCardSimple from '../MovieCardSimple/MovieCardSimple';
import './SortedResults.css'; 

const SortedResults = ({ movies, onMovieClick }) => {
  return (
    <div className="sorted-results">
      {movies.map((movie) => (
        <MovieCardSimple
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  );
};

export default SortedResults;
