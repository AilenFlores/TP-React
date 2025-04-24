import React from 'react';
import Button from '../Button/Button';
import Swal from 'sweetalert2';

const EliminarMovie = ({ movie, onEliminar }) => {
  const handleEliminar = () => {
    // Librerias externas? TRAMPA! jaja. Chiste, esta muy lindo.
    Swal.fire({
      title: `¿Estás seguro de que querés eliminar "${movie.titulo}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onEliminar(movie);
        Swal.fire('¡Eliminado!', `${movie.titulo} ha sido eliminado.`, 'success');
      }
    });
  };

  return (
    <Button onClick={handleEliminar} className="eliminar">
      Eliminar
    </Button>
  );
};

export default EliminarMovie;

