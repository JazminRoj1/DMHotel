import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer.jsx";
import Inicio from "./views/Inicio/Inicio.jsx";
import Carrusel from "./components/Carrusel/Carrusel.jsx";

export const DMHotels = () => {
    return (
        <div>
            <Nav />
            <Carrusel />
            <Inicio />
            <Footer />
        </div>
    )
}