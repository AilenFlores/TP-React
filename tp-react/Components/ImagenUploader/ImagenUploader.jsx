import React from 'react';
import './imagenUploader.css';

function ImagenUploader({ imagenSrc, onImagenChange, onEliminar, imagenEliminada }) {
  const esImagenValida = (src) =>
    typeof src === 'string' &&
    (src.startsWith('data:image/') || src.startsWith('http'));

  return (
    <>
      {esImagenValida(imagenSrc) && !imagenEliminada ? (
        <div className="imagen-preview">
          <img src={imagenSrc} alt="Imagen subida" className="preview-img" />
          <button onClick={onEliminar} className="eliminar-imagen">X</button>
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
            onChange={onImagenChange}
          />
        </>
      )}
    </>
  );
}

export default ImagenUploader;
