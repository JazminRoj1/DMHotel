import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-block">
          <h3>RESERVAS</h3>
          <p>Central de Reservas: 614-3900</p>
          <p>Email: reservas@dmhoteles.pe</p>
          <p>Dirección: Lima, Perú</p>
        </div>

        <div className="footer-block">
          <h3>DM HOTELES</h3>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Reclamaciones</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>+ INFO</h3>
          <ul>
            <li><a href="#">Promociones</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Restaurantes</a></li>
          </ul>
        </div>
        
        <div className="footer-social-container">
          <p className="social-title">Encuéntranos en:</p>
          <div className="footer-social">
            <i className="bx bxl-instagram"></i>
            <i className="bx bxl-facebook"></i>
            <i className="bx bxl-youtube"></i>
            <i className="bx bxl-trip-advisor"></i>
            <i className="bx bxl-whatsapp"></i>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 DM Hoteles. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
