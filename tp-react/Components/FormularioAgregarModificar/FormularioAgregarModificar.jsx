import React, { useState, useEffect } from 'react';
import './FormularioAgregarModificar.css';

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

  const esImagenValida = (src) =>
    typeof src === 'string' &&
    (src.startsWith('data:image/') || src.startsWith('http'));

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
      alert('Ya existe una película/serie con ese título. Por favor, elige otro título.');
      return;
    }

    const rawImage = imagen || movie?.imagen || movie?.img;
    const imagenSrc =
      typeof rawImage === 'string'
        ? rawImage
        : rawImage?.src || rawImage?.default;

    const imagenAGuardar = imagenEliminada
      ? null
      : (imagen || (esImagenValida(imagenSrc) ? imagenSrc : null));

    if (!titulo || !director || !año || !genero || !rating || !tipo || !esImagenValida(imagenSrc)) {
      alert('Por favor completá todos los campos');
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
      limpiarFormulario(); // solo si es nuevo
    }

    onClose(); // cerramos el modal desde prop
  };

  const handleEliminarImagen = () => {
    setImagen(null);
    setImagenEliminada(true);
  };

  if (!visible) return null;

  const rawImage = imagen || movie?.imagen || movie?.img;
  const imagenSrc =
    typeof rawImage === 'string'
      ? rawImage
      : rawImage?.src || rawImage?.default;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Agregar Película / Serie</h3>

        <input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />

        <select value={año} onChange={(e) => setAño(e.target.value)}>
          <option value="">Seleccioná un año</option>
          {Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Seleccioná un género</option>
          {['Drama', 'Acción', 'Ciencia ficción', 'Terror', 'Historia', 'Documental', 'Crimen', 'Fantasía', 'Romance', 'Comedia'].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Seleccioná un rating</option>
          {Array.from({ length: 9 }, (_, i) => (i + 2) / 2).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccioná un tipo</option>
          <option value="Película">Película</option>
          <option value="Serie">Serie</option>
        </select>

        <div className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={visto}
              onChange={() => setVisto(!visto)}
            />
            <span className="slider round"></span>
          </label>
          <span className="estado">{visto ? 'Visto' : 'No visto'}</span>
        </div>

        {esImagenValida(imagenSrc) && !imagenEliminada ? (
          <div className="imagen-preview">
            <img src={imagenSrc} alt="Imagen subida" className="preview-img" />
            <button onClick={handleEliminarImagen} className="eliminar-imagen">X</button>
          </div>
        ) : (
          <>
            <label htmlFor="fileInput" className="file-upload-area">
              <span className="upload-icon">📷</span>
              <span>Haz clic para subir una imagen</span>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
            />
          </>
        )}

        <button className="guardar" onClick={handleGuardar}>Guardar</button>
        <button className="cancelar" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default FormularioModal;
