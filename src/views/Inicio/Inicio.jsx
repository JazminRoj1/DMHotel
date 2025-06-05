import React from 'react';
import './Inicio.css';

const Inicio = () => {
  return (
    <main className="inicio">
      <section className="bienvenida">
        <h1>Bienvenidos a DM Hoteles</h1>
        <p>
          Descubre nuestros destinos en todo el Perú y vive experiencias inolvidables en cada uno de nuestros hoteles.
        </p>
        <a href="/hoteles" className="btn-principal">Conoce Nuestros Hoteles</a>
      </section>

      <section className="caracteristicas">
        <h2>Te ofrecemos</h2>
        <div className="caracteristicas-grid">
          <div className="caracteristica">
            <img src="/img/destinos.png" alt="Grandes Destinos" />
            <h3>Grandes Destinos</h3>
          </div>
          <div className="caracteristica">
            <img src="/img/precios.png" alt="Precios Convenientes" />
            <h3>Precios Convenientes</h3>
          </div>
          <div className="caracteristica">
            <img src="/img/ubicacion.png" alt="Buena Ubicación" />
            <h3>Buena Ubicación</h3>
          </div>
          <div className="caracteristica">
            <img src="/img/experiencia.png" alt="Experiencia Inolvidable" />
            <h3>Experiencia Inolvidable</h3>
          </div>
        </div>
      </section>

      <section className="promociones">
        <h2>Promociones</h2>
        <div className="promociones-grid">
          <div className="promocion">
            <img src="/img/promocion1.jpg" alt="Promoción 1" />
            <h3>Y tú, ¿qué planes?</h3>
            <a href="/promociones" className="btn-secundario">Ver Más</a>
          </div>
          <div className="promocion">
            <img src="/img/promocion2.jpg" alt="Promoción 2" />
            <h3>Interbank | Cuenta sueldo</h3>
            <a href="/promociones" className="btn-secundario">Ver Más</a>
          </div>
          <div className="promocion">
            <img src="/img/promocion3.jpg" alt="Promoción 3" />
            <h3>DM Hoteles | Full Day</h3>
            <a href="/promociones" className="btn-secundario">Ver Más</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Inicio;
