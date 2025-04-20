import React from 'react';
import '../DetalleMovie/DetalleMovie.css';
import Button from '../Button/Button'; // Importamos el botón reutilizable

function DetalleMovie({ movie, visible, onClose, onEditar, onEditarClick }) {
  if (!visible || !movie) return null;

  const rawImage = movie.imagen || movie.img;
  const imagenSrc =
    typeof rawImage === 'string'
      ? rawImage
      : rawImage?.src || rawImage?.default;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Detalle de la Pelicula/Serie</h3>
        <p><strong>Titulo:</strong> {movie.titulo}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Año:</strong> {movie.año}</p>
        <p><strong>Género:</strong> {movie.genero}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Tipo:</strong> {movie.tipo}</p>

        {imagenSrc && (
          <img
            src={imagenSrc}
            alt="Imagen de la Pelicula-Serie"
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
        )}

        <div className="modal-buttons">
          <Button onClick={() => onEditarClick(movie)} className="modificar">Modificar</Button>
          <Button onClick={() => onEditar(movie)} className="eliminar">Eliminar</Button>
          <Button onClick={onClose} className="cancelar">Cerrar</Button>
        </div>
      </div>
    </div>
  );
}

export default DetalleMovie;

