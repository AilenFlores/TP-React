import React from 'react';
import '../DetalleMovie/DetalleMovie.css';
import Button from '../Button/Button.jsx';
import EliminarMovie from '../EliminarMovie/EliminarMovie.jsx';

function DetalleMovie({ movie, visible, onClose, onEditar, onEditarClick, onEliminar }) {
  if (!visible || !movie) return null;

  //const imagenSrc = movie.imagen || movie.img || fallbackImage; --> asi de simple

  const rawImage = movie.imagen || movie.img;
  const imagenSrc =
    typeof rawImage === 'string'
      ? rawImage
      : rawImage?.src || rawImage?.default;

  return (
    <div
  className="modal-overlay"
  onClick={(e) => {
    //Creo que en vez de esto de clases pueden usar las props visible y movie
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  }}
>
      <div className="modal">
        <h3>Detalle de la Pelicula/Serie</h3>
        <div className="modal-content">
          {imagenSrc && (
            <div className="modal-image">
              <img
                src={imagenSrc}
                alt="Imagen de la Pelicula-Serie"
              />
            </div>
          )}
          <div className="modal-info">
            <p><strong>Titulo:</strong> {movie.titulo}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Año:</strong> {movie.año}</p>
            <p><strong>Género:</strong> {movie.genero}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Tipo:</strong> {movie.tipo}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <Button onClick={() => onEditarClick(movie)} className="modificar">Modificar</Button>
          <EliminarMovie movie={movie} onEliminar={onEliminar} />
          <Button onClick={onClose} className="cancelar">Cerrar</Button>
        </div>
      </div>
    </div>
  );
}

export default DetalleMovie;
