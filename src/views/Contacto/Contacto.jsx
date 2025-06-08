import './Contacto.css';
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import Carrusel from '../../components/Carrusel/Carrusel.jsx';

const Contacto = () => {
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

          <form className="contacto-formulario">
            <div className="fila">
              <input type="text" placeholder="Nombre y Apellido" />
              <input type="email" placeholder="Tu email" />
            </div>

            <div className="fila">
              <input type="text" placeholder="Cód. país" />
              <input type="text" placeholder="Cód. área + Núm. de teléfono" />
              <input type="text" placeholder="Fecha ingreso y salida" />
            </div>

            <div className="fila">
              <input type="number" placeholder="Cantidad de Huéspedes" />
              <textarea placeholder="Déjanos un comentario"></textarea>
            </div>

            <button type="submit" className="btn-enviar">ENVIAR</button>
          </form>
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
