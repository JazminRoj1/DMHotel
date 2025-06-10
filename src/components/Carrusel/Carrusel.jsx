import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Carrusel.css';

const imagesByRoute = {
  '/': [
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-arequipa-instalaciones-2.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-ayacucho-banner-3.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-cusco-banner-3.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-mossone-ica-banner-5.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-moquegua-banner-3.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-nasca-banner-3.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-tacna-banner-principal-4-1024x478.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-tarapoto-instalaciones-5.jpg',
    'https://dmhoteles.pe/wp-content/uploads/2019/06/dm-hoteles-peru-arequipa-instalaciones-2.jpg'
  ],
};

const Carrusel = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState(imagesByRoute['/']);

  useEffect(() => {
    const path = location.pathname;
    setImages(imagesByRoute[path] || imagesByRoute['/']);
    setCurrent(0);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="carousel">
      {images.map((src, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}
      <div className="overlay">
        <h1>ABRE LA PUERTA A TU PRÓXIMO <br /><strong>GRAN RECUERDO</strong></h1>
        <p>Descansa, conecta y déjate llevar. Porque todo lo bueno comienza aquí.</p>
        <Link to="/habitaciones" className="btn-book">
          <span>
            VER HABITACIONES
            <img
              src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/Right_arrow-512.png"
              alt="flecha"
              className="flecha-icon"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Carrusel;
