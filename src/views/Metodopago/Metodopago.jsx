import './Metodopago.css';
import Nav from '../../components/Nav/Nav';
import Carrusel from '../../components/Carrusel/Carrusel';
import Footer from '../../components/Footer/Footer';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MetodoPago = () => {
    const [exito, setExito] = useState(false);
    const navigate = useNavigate();

    // Refs para cada input
    const tarjetaRef = useRef();
    const fechaRef = useRef();
    const cvvRef = useRef();
    const nombreRef = useRef();
    const apellidoRef = useRef();
    const correoRef = useRef();

    const handlePago = (e) => {
        e.preventDefault();
        let valido = true;
    
        [tarjetaRef, fechaRef, cvvRef, nombreRef, apellidoRef, correoRef].forEach(ref => {
        ref.current.classList.remove("error");
        });
    
        const tarjeta = tarjetaRef.current.value.trim();
        if (!/^\d{16}$/.test(tarjeta)) {
        tarjetaRef.current.classList.add("error");
        valido = false;
        }
    
        const fecha = fechaRef.current.value.trim();
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fecha)) {
        fechaRef.current.classList.add("error");
        valido = false;
        }
    
        const cvv = cvvRef.current.value.trim();
        if (!/^\d{3}$/.test(cvv)) {
        cvvRef.current.classList.add("error");
        valido = false;
        }
    
        const nombre = nombreRef.current.value.trim();
        if (nombre.length < 2) {
        nombreRef.current.classList.add("error");
        valido = false;
        }
    
        const apellido = apellidoRef.current.value.trim();
        if (apellido.length < 2) {
        apellidoRef.current.classList.add("error");
        valido = false;
        }
    
        const correo = correoRef.current.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        correoRef.current.classList.add("error");
        valido = false;
        }
    
        if (valido) {
        setExito(true);
        setTimeout(() => {
            navigate('/reservas');
        }, 3000);
        }
    };
    const handleFechaChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // solo números
        if (value.length >= 3) {
          value = value.slice(0, 2) + "/" + value.slice(2, 4);
        }
        fechaRef.current.value = value.slice(0, 5); // evita más de 5 caracteres
      };      

  return (
    <>
      <Nav />
      <Carrusel />
      <div className="pago-container">
        <div className="habitacion-info">
          <h2>Resumen de Habitación</h2>
          <p><strong>Código:</strong> HB201</p>
          <p><strong>Tipo:</strong> Doble Estándar</p>
          <p><strong>Check-in:</strong> 24/06/2025</p>
          <p><strong>Check-out:</strong> 26/06/2025</p>
          <p><strong>Noches:</strong> 2</p>
          <p><strong>Total:</strong> S/ 180.00</p>
          <div className="advertencia-pago">
            <img src="https://webapp16.sedapal.com.pe/socv/assets/img/icon-alarm.svg" alt="Advertencia" />
            <p><strong>RECUERDE NO CERRAR LA VENTANA HASTA QUE LA TRANSACCIÓN DE PAGO HAYA CONCLUIDO</strong></p>
          </div>
        </div>
        

        <div className="formulario-pago">
          <h2>Formulario de Pago</h2>
            <div className="advertencia-superior">
                <p>
                    <strong>Recuerda</strong> activar las <strong>compras en línea</strong> con tu banco.
                </p>
            </div>

            <form onSubmit={handlePago}>
            <div className="fila">
            <input
                type="text"
                placeholder="Número de tarjeta"
                maxLength={16}
                inputMode="numeric"
                pattern="\d*"
                ref={tarjetaRef}
            />
            </div>

            <div className="fila">
                <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                ref={fechaRef}
                onChange={handleFechaChange}
                />


                <input
                type="text"
                placeholder="CVV"
                maxLength={3}
                inputMode="numeric"
                ref={cvvRef}
                />
            </div>

            <div className="fila">
                <input type="text" placeholder="Nombre" ref={nombreRef} />
                <input type="text" placeholder="Apellido" ref={apellidoRef} />
            </div>

            <div className="fila">
                <input type="email" placeholder="Correo electrónico" ref={correoRef} />
            </div>

            <button type="submit">Pagar S/ 180.00</button>
            </form>


          <p className="nota">Se enviará el comprobante a su correo.</p>
          <div className="logos">
            <img src="https://static-content.vnforapps.com/v2/img/bottom/visa.png" alt="Visa" />
            <img src="https://static-content.vnforapps.com/v2/img/bottom/mc.png" alt="MasterCard" />
            <img src="https://static-content.vnforapps.com/v2/img/bottom/unionpay.svg" alt="UnionPay" />
          </div>
        </div>
      </div>

      <Footer />

      {exito && (
        <div className="modal-exito">
          <div className="modal-contenido">
            <div className="check-container">✔</div>
            <h2>¡Pago exitoso!</h2>
            <p>Será redirigido a sus reservas.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MetodoPago;
