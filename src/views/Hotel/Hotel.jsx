import "./Hotel.css";
import Nav from "../../components/Nav/Nav";
import Carrusel from "../../components/Carrusel/Carrusel.jsx";
import Footer from "../../components/Footer/Footer";

const hoteles = [
  {
    nombre: "DM HOTELES Arequipa",
    descripcion: "DM Hoteles Arequipa está ubicado cerca a importantes puntos turísticos de la ciudad. El hotel tiene una vista privilegiada a los volcanes Misti, Chachani y Pichu Pichu, y está rodeado de naturaleza.",
    imagen: imgArequipa1,
    link: ""
  },
  {
    nombre: "DM HOTELES Asia",
    descripcion: "DM HOTELES ASIA se encuentra ubicado al sur de Lima, en el exclusivo balneario de Asia frente a la playa Sarapampa. Su visita será una experiencia que querrá volver a vivir.",
    imagen: imgAsia1,
    link: ""
  },
  {
    nombre: "DM HOTELES Moquegua",
    descripcion: "Ubicado en el centro histórico de Moquegua, este hotel combina arquitectura tradicional con comodidad moderna.",
    imagen: imgMoquegua1,
    link: ""
  },
  {
    nombre: "DM HOTELES Cusco",
    descripcion: "A solo unas cuadras de la Plaza de Armas, este hotel en Cusco te conecta con el corazón del Imperio Inca.",
    imagen: imgCusco1,
    link: ""
  }
];

const Hotel = () => {
  return (
    <>
      <Nav />
      <Carrusel />
      <section className="hoteles-destacados">
        <h2>HOTELES</h2>
        <div className="hoteles-grid">
          {hoteles.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img src={hotel.imagen} alt={hotel.nombre} />
              <div className="hotel-content">
                <h3>{hotel.nombre}</h3>
                <p>{hotel.descripcion}</p>
                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rojo"
                >
                  CONOCE EL HOTEL
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hotel;