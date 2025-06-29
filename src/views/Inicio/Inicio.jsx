import './Inicio.css';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <main className="inicio-container">
      <section className="bienvenida">
        <div className="texto">
          <h2>UN HOTEL, UN COMIENZO.</h2>
          <h1>¡Bienvenido a DM Hoteles!</h1>
          <p>
            Un espacio para dejar las preocupaciones, los ruidos y los pendientes. Pensado para tu descanso, bienestar y renovación.
          </p>
        </div>
        <div className="imagen">
          <img
            src="https://jardinesdeuyuni.com/wp-content/uploads/2020/08/hotel-jardines-de-uyuni-bolivia-home01.jpg"
            alt="Bienvenida Hotel"
          />
        </div>
      </section>

      <section className="servicios">
        <h2>Todo lo que necesitas para un descanso ideal</h2>

        <div className="servicios-box">
          <div className="servicios-grid">

            <div className="servicio" data-info="Atención las 24 horas para cualquier necesidad.">
              <img
                src="https://cdn1.iconfinder.com/data/icons/hotel-building/68/reception_bell-128.png"
                alt="Recepción 24/7"
              />
              <p>Recepción 24/7</p>
            </div>

            <div className="servicio" data-info="Gratis en todo el establecimiento.">
              <img
                src="https://cdn0.iconfinder.com/data/icons/essentials-solid-glyphs-vol-1/100/Wifi-Internet-Signal-128.png"
                alt="WiFi Gratis"
              />
              <p>WiFi Gratis</p>
            </div>

            <div className="servicio" data-info="Un espacio de pausa y relajación para recargar energías.">
              <img
                src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/576/spa-512.png"
                alt="Piscina"
              />
              <p>Piscina/Spa</p>
            </div>

            <div className="servicio" data-info="Asistencia turística, cambio de divisas y apoyo para tu viaje.">
              <img
                src="https://cdn1.iconfinder.com/data/icons/online-business-34/512/Travel-Consultant-agent-tour-advice-512.png"
                alt="Conserjería"
              />
              <p>Conserjería turística</p>
            </div>

          </div>
        </div>

        <Link to="/servicios" className="btn-book">
          <span>
            VER SERVICIOS
            <img
              src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/Right_arrow-512.png"
              alt="flecha"
              className="flecha-icon"
            />
          </span>
        </Link>
      </section>

      <section className="promociones">
        <h2>Promociones especiales</h2>
        <p>Ofertas exclusivas que no querrás dejar pasar.</p>

        <div className="promo-grid">

          <div className="promo-card">
            <img src="https://dmhoteles.pe/wp-content/uploads/2025/04/Banner-web-cel-7.jpg" alt="Cuenta sueldo Interbank" />
            <div className="promo-info">
              <h3>Privado: Interbank | Cuenta sueldo</h3>
              <p>Beneficios exclusivos al afiliar tu cuenta.</p>
              <a href="/Promociones" className="btn-promo">VER MÁS</a>
            </div>
          </div>

          <div className="promo-card">
            <img src="https://dmhoteles.pe/wp-content/uploads/2024/04/Asia-25-Verano-3.png" alt="Full Day" />
            <div className="promo-info">
              <h3>DM Hoteles | Full Day</h3>
              <p>Relájate y disfruta al máximo.</p>
              <a href="/Promociones" className="btn-promo">VER MÁS</a>
            </div>
          </div>

          <div className="promo-card">
            <img src="https://peruretail.sfo3.cdn.digitaloceanspaces.com/wp-content/uploads/contactless-payments-kKAE-U110860610986EHI-1248x770@El-Correo-1140x570.jpg" alt="Programa de puntos" />
            <div className="promo-info">
              <h3>Gana puntos | Viaja más</h3>
              <p>Acumula y canjea en tu próxima estadía.</p>
              <a href="/Promociones" className="btn-promo">VER MÁS</a>
            </div>
          </div>

        </div>
      </section>
      <section className="eventos">
        <h2>Eventos y celebraciones</h2>
        <p>Espacios preparados para tus momentos más importantes.</p>

        <div className="eventos-grid">

          <div className="evento-card">
            <div className="evento-img">
              <img src="https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-mossone-ica-eventos-salon-b.jpg" alt="Eventos corporativos" />
            </div>
            <div className="evento-info">
              <h3>Eventos corporativos</h3>
              <p>Salones equipados para reuniones, conferencias y presentaciones.</p>
              <a href="/eventos" className="btn-evento">VER MÁS</a>
            </div>
            </div>

            <div className="evento-card">
              <div className="evento-img">
                <img src="https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-arequipa-eventos-salones-4.jpg" alt="Bodas y celebraciones" />
              </div>
              <div className="evento-info">
                <h3>Bodas y recepciones</h3>
                <p>Ambientes elegantes y personalizables para tu gran día.</p>
                <a href="/eventos" className="btn-evento">VER MÁS</a>
              </div>
            </div>

            <div className="evento-card">
              <div className="evento-img">
                <img src="https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-tarapoto-eventos-salones-1.jpg" alt="Eventos sociales" />
              </div>
              <div className="evento-info">
                <h3>Eventos sociales</h3>
                <p>Fiestas, aniversarios o reuniones especiales con atención exclusiva.</p>
                <a href="/eventos" className="btn-evento">VER MÁS</a>
              </div>
            </div>

          </div>
        </section>

        <section className="testimonios">
          <h2 className="testimonios-titulo">Opiniones de nuestros huéspedes</h2>
          <div className="testimonio-grid">
            <div className="testimonio">
              <h3>Ruta Babylon</h3>
              <p>Las habitaciones son super acogedoras con detalles cuidados, iluminación, tv y hasta mantas térmicas en las camas acompañadas por chocolate con sal.</p>
              <div className="estrellas">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="testimonio">
              <h3>Carmen</h3>
              <p>Llegué después de hacer el tour al Salar de Uyuni, fue una experiencia inolvidable. Cuando regresas al pueblo, poder descansar en un hotel como este es un verdadero lujo.</p>
              <div className="estrellas">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="testimonio">
              <h3>Carol</h3>
              <p>Las instalaciones son geniales, venía de unos días afectada por la altura y aquí pude relajarme, desayunar bien y dormir perfectamente. Lo recomiendo 100%.</p>
              <div className="estrellas">⭐⭐⭐⭐⭐</div>
            </div>

          </div>
        </section>

    </main>
  );
};

export default Inicio;
