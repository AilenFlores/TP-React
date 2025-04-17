import { useState } from 'react';
import Style from './Button.module.css';
import FormularioModal from '../FormularioAgregarModificar/FormularioAgregarModificar.jsx';

const Button = ({ onGuardar }) => {
  const [mostrar, setMostrar] = useState(false);

  const manejarGuardar = (usuario) => {
    onGuardar(usuario);   // Envía el nuevo usuario al componente padre
    setMostrar(false);    // Cierra el modal
  };


  return (
    <>
      <button className={Style.addButton} onClick={() => setMostrar(true)}>Agregar Película</button> 
      <FormularioModal
          visible={mostrar}
          onClose={() => setMostrar(false)}
          onGuardar={manejarGuardar}
        />
    </>
  );
};

export default Button;
