import React from 'react';// Reutilizamos el mismo estilo

function DetalleUsuarioModal({ usuario, visible, onClose }) {
  console.log('usuario en detalle', usuario);
    if (!visible || !usuario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Detalle del Usuario</h3>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Edad:</strong> {usuario.edad}</p>
        {usuario.imagen && (
          <img
            src={usuario.imagen}
            alt="imagen del usuario"
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
        )}
        <button className="cancelar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default DetalleUsuarioModal;
