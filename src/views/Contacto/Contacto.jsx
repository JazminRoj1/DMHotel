import './Contacto.css';
import { useState } from 'react';
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import Carrusel from '../../components/Carrusel/Carrusel.jsx';

const Contacto = () => {
  const [sinFecha, setSinFecha] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [errores, setErrores] = useState({});

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    codPais: "",
    telefono: "",
    fecha: "",
    huespedes: "",
    comentario: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const camposObligatorios = ["nombre", "email", "codPais", "telefono", "huespedes", "comentario"];
    const nuevosErrores = {};
  
    camposObligatorios.forEach((campo) => {
      if (formData[campo].trim() === "") {
        nuevosErrores[campo] = true;
      }
    });
  
    if (!sinFecha) {
      if (!formData.fechaIngreso?.trim()) nuevosErrores.fechaIngreso = true;
      if (!formData.fechaSalida?.trim()) nuevosErrores.fechaSalida = true;
    }
  
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 4000);
      return;
    }
  
    // Si pasa validación
    setMostrarModal(true);
    setTimeout(() => {
      setFormData({
        nombre: "",
        email: "",
        codPais: "",
        telefono: "",
        fechaIngreso: "",
        fechaSalida: "",
        huespedes: "",
        comentario: ""
      });
      setErrores({});
      setSinFecha(false);
      setMostrarModal(false);
    }, 3000);
  };
  

  return (
    <>
      <Nav />
      <Carrusel />

      <section className="contacto">
        <div className="contacto-contenido">
          <div className="contacto-texto">
            <h2>¡Habla con nosotros!</h2>
            <p>
              Si tienes dudas, consultas<br />
              o sugerencias sobre tu estadía,<br />
              evento o experiencia en el hotel,<br />
              escríbenos.
            </p>
          </div>

          <form className="contacto-formulario" onSubmit={handleSubmit}>
            {/* Fila 1: Nombres y Apellidos */}
            <div className="fila fila-1col">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombres y Apellidos"
                className={errores.nombre ? "campo-error" : ""}
              />
            </div>

            {/* Fila 2: Email – Cód. país – Teléfono */}
            <div className="fila fila-3col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className={errores.email ? "campo-error" : ""}
              />
              <input
                type="text"
                name="codPais"
                value={formData.codPais}
                onChange={handleChange}
                placeholder="Cód. país"
                className={errores.codPais ? "campo-error" : ""}
              />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className={errores.telefono ? "campo-error" : ""}
              />
            </div>

            {/* Fila 3: Fechas y Huéspedes */}
            <div className="fila fila-3col">
              <input
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
                placeholder="Fecha de ingreso"
                disabled={sinFecha}
              />
              <input
                type="date"
                name="fechaSalida"
                value={formData.fechaSalida}
                onChange={handleChange}
                placeholder="Fecha de salida"
                disabled={sinFecha}
              />
              <input
                type="number"
                name="huespedes"
                value={formData.huespedes}
                onChange={handleChange}
                placeholder="Cantidad de Huéspedes"
              />
            </div>

            {/* Fila 5: Comentario */}
            <div className="fila fila-1col">
              <textarea
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Déjanos un comentario"
                className={errores.comentario ? "campo-error" : ""}
              ></textarea>
            </div>

            {mostrarAlerta && (
              <div className="alerta-campos">
                Todos los campos deben ser llenados antes de enviar el formulario.
              </div>
            )}

            <button type="submit" className="btn-enviar">ENVIAR</button>
          </form>

          {mostrarModal && (
            <div className="modal-confirmacion">
              <p>Gracias por tu preferencia. Tu consulta ha sido enviada.</p>
            </div>
          )}
        </div>

        <div className="contacto-info">
          <div>
            <i className="icono-mapa"></i>
            <p><strong>DM Hoteles</strong><br />Av. Gregorio Escobedo 598, Jesús María, Lima.</p>
          </div>
          <div>
            <p><strong>Teléfono</strong><br />51 1 614-3900</p>
          </div>
          <div>
            <p><strong>Email</strong><br />reservas@dmhoteles.pe</p>
          </div>
        </div>

        <div className="contacto-mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7802.783316995029!2d-77.05637319031374!3d-12.085317742568357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ff9efe3583%3A0xbb35c82049959630!2sAv.%20Gregorio%20Escobedo%20598%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015072!5e0!3m2!1sen!2spe!4v1749384769262!5m2!1sen!2spe"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación DM Hoteles"
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contacto;
