import { useState } from 'react';
import '../FormularioAgregarModificar/FormularioAgregarModificar.css';

function FormularioModal({ visible, onClose, onGuardar }) {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [anio, setAnio] = useState('');
  const [genero, setGenero] = useState('');
  const [rating, setRating] = useState('');
  const [tipo, setTipo] = useState('');
  const [visto, setVisto] = useState(false); // <-- Estado para switch
  const [imagen, setImagen] = useState(null);

  const handleGuardar = () => {
    if (!titulo || !director || !anio || !genero || !rating || !tipo || !imagen) {
      alert('Por favor completá todos los campos');
      return;
    }

    onGuardar({ titulo, director, anio, genero, rating, tipo, imagen, visto });
    onClose();

    // Reset de los campos
    setTitulo('');
    setDirector('');
    setAnio('');
    setGenero('');
    setRating('');
    setTipo('');
    setVisto(false);
    setImagen(null);
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleEliminarImagen = () => {
    setImagen(null);
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Agregar Película / Serie</h3>
        <input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
        <input placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
        <input placeholder="Genero" value={genero} onChange={(e) => setGenero(e.target.value)} />
        <input placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        <input placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

        {/* Switch Visto / No visto */}
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" checked={visto} onChange={() => setVisto(!visto)} />
            <span className="slider round"></span>
          </label>
          <span className="estado">{visto ? 'Visto' : 'No visto'}</span>
        </div>

        {/* Mostrar el input para subir imagen solo si no hay imagen cargada */}
        {!imagen && (
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

        {/* Mostrar imagen subida como miniatura y botón de eliminar con "X" */}
        {imagen && (
          <div className="imagen-preview">
            <img src={imagen} alt="Imagen subida" className="preview-img" />
            <button onClick={handleEliminarImagen} className="eliminar-imagen">X</button>
          </div>
        )}

        <button className="guardar" onClick={handleGuardar}>Guardar</button>
        <button className="cancelar" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default FormularioModal;
