import "./Habitaciones.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import Carrusel from "../../components/Carrusel/Carrusel.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
const habitaciones = [
  {
    nombre: "HABITACIÓN ESTANDAR",
    descripcion:
      "Habitación con vista privilegiada a los volcanes Misti, Chachani y Pichu Pichu, y está rodeada de naturaleza.",
    imagenes: [
      "https://lacasonadelolivo.com.pe/wp-content/uploads/2020/03/hotel-3-estrellas-con-2-camas.jpg",
      "https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
      "https://image-tc.galaxy.tf/wijpeg-8l5lyyrd03o9e5ri84dh95iyh/doubledeluxe1_wide.jpg?crop=0%2C58%2C1800%2C1013",
    ],
    sedes: ["moquegua", "arequipa", "lima"],
  },
  {
    nombre: "HABITACIÓN DOBLE",
    descripcion:
      "Habitación frente a la playa Sarapampa en el exclusivo balneario de Asia. Una experiencia que querrá volver a vivir.",
    imagenes: [
      "https://lacasonadelolivo.com.pe/wp-content/uploads/2020/03/hotel-3-estrellas-con-2-camas.jpg",
      "https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
      "https://image-tc.galaxy.tf/wijpeg-8l5lyyrd03o9e5ri84dh95iyh/doubledeluxe1_wide.jpg?crop=0%2C58%2C1800%2C1013",
    ],
    sedes: ["moquegua", "arequipa", "lima"],
  },
  {
    nombre: "HABITACIÓN TRIPLE",
    descripcion:
      "Habitación que combina arquitectura tradicional con comodidad moderna en el centro histórico de Moquegua.",
    imagenes: [
      "https://lacasonadelolivo.com.pe/wp-content/uploads/2020/03/hotel-3-estrellas-con-2-camas.jpg",
      "https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
      "https://image-tc.galaxy.tf/wijpeg-8l5lyyrd03o9e5ri84dh95iyh/doubledeluxe1_wide.jpg?crop=0%2C58%2C1800%2C1013",
    ],
    sedes: ["moquegua", "arequipa", "lima", "tarapoto"],
  },
  {
    nombre: "HABITACIÓN MATROMONIAL",
    descripcion:
      "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
    imagenes: [
      "https://lacasonadelolivo.com.pe/wp-content/uploads/2020/03/hotel-3-estrellas-con-2-camas.jpg",
      "https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
      "https://image-tc.galaxy.tf/wijpeg-8l5lyyrd03o9e5ri84dh95iyh/doubledeluxe1_wide.jpg?crop=0%2C58%2C1800%2C1013",
    ],
    sedes: ["moquegua", "arequipa"],
  },
  {
    nombre: "HABITACIÓN SUIT",
    descripcion:
      "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
    imagenes: [
      "https://lacasonadelolivo.com.pe/wp-content/uploads/2020/03/hotel-3-estrellas-con-2-camas.jpg",
      "https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
      "https://image-tc.galaxy.tf/wijpeg-8l5lyyrd03o9e5ri84dh95iyh/doubledeluxe1_wide.jpg?crop=0%2C58%2C1800%2C1013",
    ],
    sedes: ["moquegua", "arequipa"],
  },
];

const HabitacionesSlider = ({ imagenes, nombre }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay && imagenes.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === imagenes.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, imagenes.length]);

  const navigate = (direction) => {
    setAutoplay(false);
    let newIndex;
    if (direction === 1) {
      newIndex =
        currentImageIndex === imagenes.length - 1 ? 0 : currentImageIndex + 1;
    } else {
      newIndex =
        currentImageIndex === 0 ? imagenes.length - 1 : currentImageIndex - 1;
    }
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="habitacion-slider-container">
      <div className="habitacion-slider-track">
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            className={`habitacion-slide ${
              index === currentImageIndex ? "active" : ""
            }`}
          >
            <img src={imagen} alt={`${nombre} - Imagen ${index + 1}`} />
          </div>
        ))}
      </div>

      {imagenes.length > 1 && (
        <>
          <button
            className="slider-nav-button prev"
            onClick={() => navigate(-1)}
            aria-label="Imagen anterior"
          >
            &lt;
          </button>
          <button
            className="slider-nav-button next"
            onClick={() => navigate(1)}
            aria-label="Siguiente imagen"
          >
            &gt;
          </button>

          <div className="slider-dots">
            {imagenes.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentImageIndex(index);
                }}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Habitaciones = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <Nav />
      <Carrusel />
      <section className="habitaciones-destacadas">
        <h2>HABITACIONES</h2>
        <div className="habitaciones-grid">
          {habitaciones.map((habitacion, index) => (
            <div className="habitacion-card" key={index}>
              <HabitacionesSlider
                imagenes={habitacion.imagenes}
                nombre={habitacion.nombre}
              />
              <div className="habitacion-content">
                <h3>{habitacion.nombre}</h3>
                <p>{habitacion.descripcion}</p>
                <hr></hr>
                <ul>
                  {habitacion.sedes.map((sede, index) => (
                    <li key={index}>{sede.toUpperCase()}</li>
                  ))}
                </ul>
                <button
                  className="btn-rojo"
                  onClick={() => {
                    if (!user) {
                      alert(
                        "Por favor, regístrese o inicie sesión para continuar."
                      );
                      navigate("/login");
                    } else {
                      navigate("/Reservas");
                    }
                  }}
                >
                  RESERVAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Habitaciones;
