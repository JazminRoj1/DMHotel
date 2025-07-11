import './Habitacion.css'
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";


import { useState, useEffect } from "react";

const habitaciones = [
	{
		nombre: "Habitación Estándar",
		descripcion: "Habitación con vista privilegiada a los volcanes Misti, Chachani y Pichu Pichu, y está rodeada de naturaleza.",
		imagenes: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEbZZYl1ZFMKrLKwuEqcfsrj-VH7guXC-HA&s",
			"https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
			"https://mundodehoteles.com/wp-content/uploads/diferencia-habitacion-twin-y-doble.webp"
		],
		sedes: ['moquegua', 'arequipa', 'lima',"tarapoto"]
	},
	{
		nombre: "Habitación Doble",
		descripcion: "Habitación frente a la playa Sarapampa en el exclusivo balneario de Asia. Una experiencia que querrá volver a vivir.",
		imagenes: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEbZZYl1ZFMKrLKwuEqcfsrj-VH7guXC-HA&s",
			"https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
			"https://mundodehoteles.com/wp-content/uploads/diferencia-habitacion-twin-y-doble.webp"
		],
		sedes: ['moquegua', 'arequipa']
	},
	{
		nombre: "Habitación Twin",
		descripcion: "Habitación que combina arquitectura tradicional con comodidad moderna en el centro histórico de Moquegua.",
		imagenes: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEbZZYl1ZFMKrLKwuEqcfsrj-VH7guXC-HA&s",
			"https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
			"https://mundodehoteles.com/wp-content/uploads/diferencia-habitacion-twin-y-doble.webp"
		],
		sedes: ['moquegua', 'arequipa', 'lima']
	},
	{
		nombre: "Habitación Triple",
		descripcion: "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
		imagenes: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEbZZYl1ZFMKrLKwuEqcfsrj-VH7guXC-HA&s",
			"https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
			"https://mundodehoteles.com/wp-content/uploads/diferencia-habitacion-twin-y-doble.webp"
		],
		sedes: ['moquegua', 'arequipa', 'lima','tarapoto']
	},
	{
		nombre: "Suite Ejecutiva",
		descripcion: "Habitación que te conecta con el corazón del Imperio Inca, a solo unas cuadras de la Plaza de Armas.",
		imagenes: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEbZZYl1ZFMKrLKwuEqcfsrj-VH7guXC-HA&s",
			"https://www.hotelmayucusco.com/wp-content/uploads/habitacion-doble-superior-10.webp",
			"https://mundodehoteles.com/wp-content/uploads/diferencia-habitacion-twin-y-doble.webp"
		],
		sedes: ['moquegua', 'arequipa']
	}
];

const HabitacionesSlider = ({ imagenes, nombre }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	useEffect(() => {
		let interval;
		if (autoplay && imagenes.length > 1) {
			interval = setInterval(() => {
				setCurrentImageIndex(prev => (prev === imagenes.length - 1 ? 0 : prev + 1));
			}, 3000);
		}
		return () => clearInterval(interval);
	}, [autoplay, imagenes.length]);

	const navigate = (direction) => {
		setAutoplay(false);
		let newIndex;
		if (direction === 1) {
			newIndex = currentImageIndex === imagenes.length - 1 ? 0 : currentImageIndex + 1;
		} else {
			newIndex = currentImageIndex === 0 ? imagenes.length - 1 : currentImageIndex - 1;
		}
		setCurrentImageIndex(newIndex);
	};

	return (
		<div className="habitacion-slider-container">
			<div className="habitacion-slider-track">
				{imagenes.map((imagen, index) => (
					<div
						key={index}
						className={`habitacion-slide ${index === currentImageIndex ? 'active' : ''}`}
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
								className={`dot ${index === currentImageIndex ? 'active' : ''}`}
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

const Habitacion = () => {
	return (
		<>
			<Nav />
			<section className="habitaciones-destacadas">
				<h2>HABITACIONES</h2>
				<div className="habitaciones-grid">
					{habitaciones.map((habitacion, index) => (
						<div className="habitacion-card" key={index}>
							<HabitacionesSlider imagenes={habitacion.imagenes} nombre={habitacion.nombre} />
							<div className="habitacion-content">
								<h3>{habitacion.nombre}</h3>
								<p>{habitacion.descripcion}</p>
								<hr></hr>
								<ul>
									{habitacion.sedes.map((sede, index) => (
										<li key={index}>{sede.toUpperCase()}</li>
									))}
								</ul>
								<a
									href={habitacion.link}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-rojo"
								>
									Reservar
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

export default Habitacion;