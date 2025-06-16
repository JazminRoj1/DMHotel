import React, { useState } from 'react';
import './PerfilServ.css';

const opcionesServicios = [
  'Spa & Masajes',
  'Desayuno en la habitación',
  'Limpieza Extra',
  'Decoración especial',
  'Transporte al aeropuerto',
  'Atención médica'
];

const PerfilServ = () => {
  const [formData, setFormData] = useState({
    servicio: '',
    fecha: '',
    hora: '',
    lugar: '',
    comentario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitud enviada:', formData);
    alert("Solicitud enviada (simulada)");
  };

  return (
    <div className="servicios-container">
      <h2 className="titulo-servicio">Solicitar un Servicio</h2>
      <form className="form-servicio" onSubmit={handleSubmit}>
        <label>Tipo de servicio:</label>
        <select name="servicio" onChange={handleChange} required>
          <option value="">-- Selecciona un servicio --</option>
          {opcionesServicios.map((op, idx) => (
            <option key={idx} value={op}>{op}</option>
          ))}
        </select>

        <div className="input-row">
          <div>
            <label>Fecha:</label>
            <input type="date" name="fecha" onChange={handleChange} required />
          </div>
          <div>
            <label>Hora:</label>
            <input type="time" name="hora" onChange={handleChange} required />
          </div>
        </div>

        <label>Lugar:</label>
        <input type="text" name="lugar" onChange={handleChange} placeholder="Ej. Habitación 302" required />

        <label>Comentario (opcional):</label>
        <textarea name="comentario" rows="3" onChange={handleChange}></textarea>

        <div className="btn-container">
          <button className="btn-solicitar" type="submit">Solicitar</button>
        </div>

      </form>
    </div>
  );
};

export default PerfilServ;
