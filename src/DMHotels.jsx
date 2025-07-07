import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer.jsx";
import Inicio from "./views/Inicio/Inicio.jsx";
import Carrusel from "./components/Carrusel/Carrusel.jsx";
import { useState } from "react";
import { ChatButton } from "./components/chatbot/ChabButton";
import { VirtualAssistant } from "./components/chatbot/VirtualAssitant";

export const DMHotels = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
    };
    return (
        <div>
            <Nav />
            <Carrusel />
            <Inicio />
            <ChatButton onClick={toggleChat} isOpen={isChatOpen} />
            <VirtualAssistant isOpen={isChatOpen} onToggle={toggleChat} />
            <Footer />
        </div>
    )
}