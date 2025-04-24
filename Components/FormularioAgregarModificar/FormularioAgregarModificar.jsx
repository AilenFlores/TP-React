import React, { useState, useEffect } from 'react';
import ImagenUploader from '../ImagenUploader/ImagenUploader.jsx';
import './FormularioAgregarModificar.css';
import SelectField from '../SelectField/SelectField.jsx';
import SwitchVisto from '../SwitchVisto/SwitchVisto.jsx';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/Button.jsx';
import Swal from 'sweetalert2';

const esImagenValida = (src) =>
  typeof src === 'string' &&
  (src.startsWith('data:image/') || src.startsWith('http'));

function FormularioModal({ visible, onClose, onGuardar, movie, peliculas }) {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [año, setAño] = useState('');
  const [genero, setGenero] = useState('');
  const [rating, setRating] = useState('');
  const [tipo, setTipo] = useState('');
  const [visto, setVisto] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenEliminada, setImagenEliminada] = useState(false);

  const rawImage = imagen || movie?.imagen || movie?.img;
  const imagenSrc =
    typeof rawImage === 'string'
      ? rawImage
      : rawImage?.src || rawImage?.default;

  useEffect(() => {
    if (movie) {
      setTitulo(movie.titulo);
      setDirector(movie.director);
      setAño(movie.año);
      setGenero(movie.genero);
      setRating(movie.rating);
      setTipo(movie.tipo);
      setVisto(movie.visto);
      setImagen(movie.imagen);
      setImagenEliminada(false);
    } else {
      limpiarFormulario();
    }
  }, [movie, visible]);

  const limpiarFormulario = () => {
    setTitulo('');
    setDirector('');
    setAño('');
    setGenero('');
    setRating('');
    setTipo('');
    setVisto(false);
    setImagen(null);
    setImagenEliminada(false);
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
        setImagenEliminada(false);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleGuardar = () => {
    const tituloExistente = peliculas?.some(
      (p) =>
        p.titulo.trim().toLowerCase() === titulo.trim().toLowerCase() &&
        (!movie || p.id !== movie.id)
    );

    if (tituloExistente) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ya existe una película/serie con ese título. Por favor, elige otro título.',
      });
      return;
    }

    const imagenAGuardar = imagenEliminada
      ? null
      : (imagen || (esImagenValida(imagenSrc) ? imagenSrc : null));

    if (!titulo || !director || !año || !genero || !rating || !tipo || !esImagenValida(imagenAGuardar)) {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Por favor completá todos los campos.',
      });
      return;
    }

    onGuardar({
      id: movie?.id,
      titulo,
      director,
      año,
      genero,
      rating,
      tipo,
      imagen: imagenAGuardar,
      visto,
    });

    if (!movie) {
      limpiarFormulario();
    }

    onClose();
  };

  const handleEliminarImagen = () => {
    setImagen(null);
    setImagenEliminada(true);
  };

  if (!visible) return null;

  
  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* <h3>{movie ? "Editar Pelicula / Serie" : "Agregar Pelocula / Serie"}</h3>

        asi tienen titulo distinto si esta editando o agregando
 */}
        <h3>Agregar Película / Serie</h3>

        <InputField 
          label="Titulo"
          value={titulo} 
          onChange={setTitulo} 
          placeholder="Título de la película"
        />

        <InputField 
          label="Director"
          value={director} 
          onChange={setDirector} 
          placeholder="Director de la película"
        />

        <SelectField
          label="Año"
          value={año}
          onChange={setAño}
          options={Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i)}
          placeholder="Seleccioná un año"
        />

        <SelectField
          label="Género"
          value={genero}
          onChange={setGenero}
          options={['Drama', 'Acción', 'Ciencia ficción', 'Terror', 'Historia', 'Documental', 'Crimen', 'Fantasía', 'Romance', 'Comedia']}
        />

        <SelectField
          label="Rating"
          value={rating}
          onChange={setRating}
          options={Array.from({ length: 9 }, (_, i) => (i + 2) / 2)}
        />

        <SelectField
          label="Tipo"
          value={tipo}
          onChange={setTipo}
          options={['Pelicula', 'Serie']}
        />

        <SwitchVisto visto={visto} onChange={() => setVisto(!visto)} />

        <ImagenUploader
          imagenSrc={imagenSrc}
          onImagenChange={handleImagenChange}
          onEliminar={handleEliminarImagen}
          imagenEliminada={imagenEliminada}
        />

        <Button onClick={handleGuardar} className="guardar">Guardar</Button>
        <Button onClick={onClose} className="cancelar">Cancelar</Button>
      </div>
    </div>
  );
}

export default FormularioModal;
