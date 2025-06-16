import React, { useState } from 'react';
import './PerfilEdit.css';
import { useUsuario } from "../../components/Context/UsuarioContext.jsx";


const PerfilEdit = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
  });
  
  /* 🔁 Versión para producción con datos del usuario (activar cuando esté todo conectado)
    const [formData, setFormData] = useState({
      nombre: usuario?.nombres || '',
      apellido: usuario?.apellidos || '',
      dni: usuario?.dni || '',
      telefono: usuario?.telefono || '',
    }); */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    
  };
  const { usuario } = useUsuario();

  return (
    <div className="perfil-edit-container">
      <h2 className="titulo-form">Información de Contacto</h2>
      <form onSubmit={handleSubmit} className="formulario-grid">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <div className="boton-derecha">
          <button type="submit" className="btn-guardar">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default PerfilEdit;
