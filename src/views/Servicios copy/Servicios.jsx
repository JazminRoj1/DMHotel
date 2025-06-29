import "./Servicios.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Carrusel from "../../components/Carrusel/Carrusel";

const Servicios = () => {
  return (
    <>
      <Nav />
      <Carrusel />

      {/* Bienvenida principal */}
      <section className="intro-servicios">
        <h1>Relájate, disfruta,<br />comparte y prepárate</h1>
        <p>
          En DM Hoteles ofrecemos todo lo que necesitas para disfrutar de una estadía cómoda, segura y
          reconfortante. Desde tus primeros minutos con nosotros, nuestro equipo se encargará de brindarte
          atención personalizada para que solo te preocupes por lo importante: disfrutar tu viaje.
        </p>
      </section>

      {/* Servicios destacados */}
      <section className="grid-servicios fondo-claro">
        <h2>Servicios incluidos en tu estadía</h2>
        <div className="servicios-grid">
          <div className="servicio-item">
            <img src="https://cdn1.iconfinder.com/data/icons/hotel-building/68/reception_bell-128.png" alt="Recepción 24/7" />
            <p>Recepción 24/7</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn0.iconfinder.com/data/icons/essentials-solid-glyphs-vol-1/100/Wifi-Internet-Signal-512.png" alt="WiFi Gratis" />
            <p>WiFi Gratis</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/576/spa-512.png" alt="Piscina temperada" />
            <p>Piscina/Spa</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn1.iconfinder.com/data/icons/online-business-34/512/Travel-Consultant-agent-tour-advice-512.png" alt="Conserjería" />
            <p>Conserjería turística</p>
          </div>
        </div>
      </section>

      {/* Servicios adicionales */}
      <section className="grid-servicios fondo-blanco">
        <h2>Área de entretenimiento y servicios adicionales</h2>
        <div className="servicios-grid">
          <div className="servicio-item">
            <img src="https://cdn4.iconfinder.com/data/icons/kitchen-326/164/8_-_Fork_and_Knife-512.png" alt="Restaurante" />
            <p>Restaurante</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn3.iconfinder.com/data/icons/sport-activity/1024/ic_games_room-512.png" alt="Sala de juegos" />
            <p>Sala de juegos</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn2.iconfinder.com/data/icons/christmas-party-line-vol-3/64/restaurante__alcoholic_drink__cheers__alcohol__champagne_glass__drink-512.png" alt="Sala de eventos" />
            <p>Sala de eventos</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_17-256.png" alt="Business center" />
            <p>Business center</p>
          </div>
          <div className="servicio-item">
            <img src="https://cdn3.iconfinder.com/data/icons/solid-amenities-icon-set/64/Parking_2-512.png" alt="Estacionamiento" />
            <p>Estacionamiento privado</p>
          </div>
        </div>
      </section>

      {/* Bloque 1: Piscina y sauna */}
      <section className="bloque-servicio">
        <div className="texto-servicio">
          <span className="etiqueta">RELAX Y BIENESTAR</span>
          <h2>Piscina climatizada y spa</h2>
          <p>
            DM Hoteles cuenta con espacios exclusivos para tu bienestar físico y mental. Nuestra piscina climatizada
            y áreas de sauna seco y húmedo son ideales para relajarte después de un largo día de viaje. Disfruta de
            un momento de descanso total con instalaciones pensadas para reconectar contigo mismo o compartir con
            quienes te acompañan.
          </p>
        </div>
        <div className="imagen-servicio">
          <img src="https://jardinesdeuyuni.com/wp-content/uploads/2024/09/1-768x768.webp" alt="Piscina climatizada y sauna" />
        </div>
      </section>

      {/* Bloque 2: Restaurante invertido */}
      <section className="bloque-servicio invertido">
        <div className="texto-servicio">
          <span className="etiqueta">EXPERIENCIA CULINARIA</span>
          <h2>Restaurantes en cada uno de nuestros hoteles</h2>
          <p>
            Todos los hoteles de la cadena DM cuentan con su propio restaurante, ofreciendo una experiencia culinaria única en cada ciudad.
            Nuestra propuesta gastronómica se adapta al entorno, combinando ingredientes locales con recetas tradicionales y modernas.
            Ya sea que viajes por descanso o trabajo, disfrutarás de platos variados en un ambiente acogedor, sin salir del hotel.
          </p>
        </div>
        <div className="imagen-servicio">
          <img
            src="https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-arequipa-restaurante-bar-1.jpg"
            alt="Restaurante en hotel DM"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Servicios;
