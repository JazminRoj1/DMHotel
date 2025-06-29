import { useEffect, useState } from "react";
import "./Promociones.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Carrusel from "../../components/Carrusel/Carrusel";
import { Link } from "react-router-dom";

const MiniCarrusel = ({ imagenes }) => {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const intervalo = setInterval(() => {
        setIndex((prev) => (prev + 1) % imagenes.length);
      }, 3000);
      return () => clearInterval(intervalo);
    }, [imagenes.length]);
  
    return (
      <div className="mini-carrusel">
        <img
          src={imagenes[index]}
          alt={`promo-${index}`}
        />
      </div>
    );
  };
  

const Promociones = () => {
  const interbankImgs = [
    "https://i0.wp.com/amenitiz.com/wp-content/uploads/2022/10/coq190xt8ysuf29hapul.jpg?fit=650%2C434&ssl=1",
    "https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/3c/3ce2dcf2-5de1-4cce-adf2-f7c2b47a6616/web_formin_mobile_EEFF_202503.jpg",
    "https://tofuu.getjusto.com/orioneat-local/resized2/Cbog3TaeLKogsEG4c-800-x.webp"
  ];
  const puntosImgs = [
    "https://img.freepik.com/premium-photo/breakfast-luxury-hotel-table-full-various-food-from-buffet-modern-resort_130458-1048.jpg",
    "https://dmhoteles.pe/wp-content/uploads/2024/09/Buffet_tacna2.png",
    "https://dmhoteles.pe/wp-content/uploads/2024/09/Buffet_tacna.png",
    "https://0e9d299e890b0f46f43d-3dd2c92c26268727c0280f27b5b17857.ssl.cf1.rackcdn.com/responsive/4:3/Native/u/spa/s_spa_towels_and_stones.jpg",
    "https://kullaytravelperu.com/wp-content/uploads/2017/09/pa-estudiantes-5-y-4-750x410.jpg"
  ];

  return (
    <>
      <Nav />
      <Carrusel />
      <div className="promo-container">
        <h1 className="promo-titulo">Promociones pensadas para ti</h1>
        <p className="promo-descripcion">
          Sabemos lo que necesitas: desconexión real, momentos únicos y experiencias que valgan la pena. Estas promociones no son casualidad, son nuestra forma de resolver tus ganas de vivir mejor.
        </p>

        {/* 🟠 INTERBANK */}
        <section className="promo-bloque interbank">
          <div className="interbank-img">
            <MiniCarrusel imagenes={interbankImgs} />
          </div>
          <div className="interbank-texto">
            <h2>Privado: Interbank | Cuenta sueldo</h2>
            <p>
              ¿Tienes cuenta sueldo en Interbank? Accede a un{" "}
              <strong>descuento de hasta 50%</strong> en tu próxima reserva.
            </p>
            <ul>
              <li>Reservas válidas todo el año</li>
              <li>Aplica solo para afiliados Interbank</li>
              <li>Perfecto para escapadas o vacaciones largas</li>
              <li>Descuento en platos a la carta y bebidas sin alcohol</li>
            </ul>
            <div className="info-detalle">
              <h4>¿Cómo se aplica?</h4>
              <p>
                Solo presenta tu tarjeta al hacer check-in o reserva por
                teléfono. No es necesario validar en la web.
              </p>
            </div>
          </div>
        </section>

       {/* 🟠 Full Day */}
       <section className="promo-bloque fullday">
        <div className="fullday-texto">
            <h2>DM Hoteles | Full Day</h2>
            <p>
            Relájate y vive una experiencia inolvidable con nuestro paquete Full Day. 
            Incluye acceso completo a las piscinas y zonas comunes, actividades recreativas durante todo el día, 
            almuerzo ejecutivo (entrada y fondo), una bebida no alcohólica y shows familiares.
            </p>
            <p><strong>Precio:</strong> Hasta 20% de descuento por reservación</p>
            <p><strong>Días:</strong> Martes y Jueves |previa reserva</p>
            <p><strong>Horario:</strong> 10:00 a.m. a 6:00 p.m.</p>
            

            <p className="sedes-titulo">Incluye:</p>
            <ul className="sedes-lista">
            <li>Menú Ejecutivo: Entrada y fondo.</li>
            <li>Una bebida no alcohólica.</li>
            <li>Acceso a piscina.</li>
            </ul>

            <p className="sedes-titulo">Reservas:</p>
            <ul className="sedes-lista">
            <li>Cel.: 978 830 131 | Tel.: (052) 424 193 | tacna@dmhoteles.pe</li>
            </ul>

            <p className="sedes-titulo">Más Información:</p>
            <a
            href="https://wa.me/51978830131"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wsp"
            >
            <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo-whatsapp-256.png" alt="WhatsApp" />
            WhatsApp
            </a>
            <p className="disponibilidad-info">
                Promoción válida en nuestras sedes de <strong>DM HOTELES MOSSONE ICA</strong>, <strong>DM HOTELES MOQUEGUA</strong> y <strong>DM HOTELES TACNA</strong>. Reserva con anticipación.
            </p>
        </div>
        </section>

        {/* 🟣 Puntos */}
        <section className="promo-bloque membresias">
            <div className="beneficio-container">
                <div className="beneficio-info">
                    <p className="etiqueta">BENEFICIO EXCLUSIVO</p>
                    <h3>Privado: Puntos y Membresías | Cliente preferente</h3>
                    <p>¿Formas parte de nuestro programa de fidelidad? Acumula puntos, sube de nivel y accede a <strong>descuentos especiales en reservas y servicios exclusivos</strong>.</p>

                    <ul>
                    <li>Gana puntos al participar en eventos y al hacer reservas</li>
                    <li>Canjea puntos por descuentos o experiencias</li>
                    <li>Los beneficios varían según tu nivel de membresía</li>
                    </ul>

                    <p><strong>Niveles de membresía:</strong></p>
                    <ul>
                    <li><strong>Estándar:</strong> Acumula puntos y accede a promociones básicas</li>
                    <li><strong>Premium:</strong> Descuentos en piscina, spa y reservas especiales</li>
                    <li><strong>Élite:</strong> Acceso exclusivo a city tours, upgrades y servicios personalizados</li>
                    </ul>

                    <p><strong>¿Cómo se aplica?</strong><br />
                    Solo presenta tu número de cliente o código de membresía al hacer check-in o al reservar por teléfono. <br />
                    <em>No necesitas validarlo en la web.</em></p>
                </div>
            
                <div className="beneficio-imagen">
                    <MiniCarrusel imagenes={puntosImgs} />
                </div>
            </div>
        </section>

        {/* Llamado final */}
        <div className="final-call">
          <h3>¡Aprovecha estos beneficios y vive más experiencias!</h3>
          <Link to="/Login" className="boton-reserva">Reservar ahora</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Promociones;
