import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, Calendar, MapPin, CreditCard } from 'lucide-react';
import { ChatService } from '../../services/chatService.js';
import './VirtualAssitant.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'quick-reply';
}

interface VirtualAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = useRef(new ChatService());

  const predefinedQuestions = [
    {
      text: "¿Qué tipos de habitaciones tienen?",
      icon: "🏨",
      category: "rooms"
    },
    {
      text: "Consultar disponibilidad",
      icon: "📅",
      category: "availability"
    },
    {
      text: "¿Cuáles son los precios?",
      icon: "💰",
      category: "pricing"
    },
    {
      text: "¿Qué eventos tienen programados?",
      icon: "🎉",
      category: "events"
    },
    {
      text: "¿Qué servicios incluyen?",
      icon: "🛎️",
      category: "services"
    },
    {
      text: "¿Cómo hago una reserva?",
      icon: "📝",
      category: "booking"
    }
  ];

  const quickReplies = [
    "Ver habitaciones disponibles",
    "Consultar precios",
    "Eventos del hotel",
    "Hacer una reserva",
    "Servicios incluidos",
    "Política de cancelación"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "¡Hola! 👋 Soy tu asistente virtual de Hotel Paradise.\n\nPuedo ayudarte con:\n• Información sobre habitaciones\n• Consulta de disponibilidad en tiempo real\n• Precios y ofertas especiales\n• Eventos y actividades\n• Proceso de reservas\n• Servicios del hotel\n\n¿En qué puedo ayudarte hoy?",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatService.current.processMessage(content);
      
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); 
      
    } catch (error) {
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Disculpa, estoy teniendo problemas técnicos. ¿Podrías intentar de nuevo?",
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const formatMessage = (content: string) => {
    // Convertir texto con formato markdown básico
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  if (!isOpen) return null;

  return (
    <div className={`virtual-assistant ${isMinimized ? 'virtual-assistant--minimized' : ''}`}>
      {/* Header */}
      <div className="virtual-assistant__header">
        <div className="virtual-assistant__header-info">
          <div className="virtual-assistant__avatar">
            <Bot className="virtual-assistant__avatar-icon" />
          </div>
          <div className="virtual-assistant__status">
            <h3 className="virtual-assistant__title">Asistente Virtual</h3>
            <div className="virtual-assistant__online">
              <div className="virtual-assistant__online-dot"></div>
              <p className="virtual-assistant__online-text">En línea</p>
            </div>
          </div>
        </div>
        <div className="virtual-assistant__controls">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="virtual-assistant__control-btn"
            title={isMinimized ? "Expandir" : "Minimizar"}
          >
            {isMinimized ? <Maximize2 className="virtual-assistant__control-icon" /> : <Minimize2 className="virtual-assistant__control-icon" />}
          </button>
          <button
            onClick={onToggle}
            className="virtual-assistant__control-btn"
            title="Cerrar chat"
          >
            <X className="virtual-assistant__control-icon" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="virtual-assistant__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'message--user' : 'message--assistant'}`}
              >
                <div className="message__content">
                  <div className={`message__avatar ${message.sender === 'user' ? 'message__avatar--user' : 'message__avatar--assistant'}`}>
                    {message.sender === 'user' ? (
                      <User className="message__avatar-icon" />
                    ) : (
                      <Bot className="message__avatar-icon" />
                    )}
                  </div>
                  <div className={`message__bubble ${message.sender === 'user' ? 'message__bubble--user' : 'message__bubble--assistant'}`}>
                    <div 
                      className="message__text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    <p className="message__time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message message--assistant">
                <div className="message__content">
                  <div className="message__avatar message__avatar--assistant">
                    <Bot className="message__avatar-icon" />
                  </div>
                  <div className="message__bubble message__bubble--assistant">
                    <div className="typing-indicator">
                      <div className="typing-indicator__dot"></div>
                      <div className="typing-indicator__dot"></div>
                      <div className="typing-indicator__dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="virtual-assistant__quick-questions">
              <p className="virtual-assistant__quick-questions-title">Preguntas frecuentes:</p>
              <div className="virtual-assistant__questions-grid">
                {predefinedQuestions.slice(0, 4).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question.text)}
                    className="quick-question-btn"
                  >
                    <span className="quick-question-btn__icon">{question.icon}</span>
                    <span className="quick-question-btn__text">
                      {question.text.length > 20 ? question.text.substring(0, 20) + '...' : question.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {messages.length > 1 && !isTyping && (
            <div className="virtual-assistant__quick-replies">
              <div className="quick-replies">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="quick-reply-btn"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="virtual-assistant__input">
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputValue)}
                placeholder="Escribe tu pregunta..."
                className="input-field"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isTyping || !inputValue.trim()}
                className="send-btn"
              >
                <Send className="send-btn__icon" />
              </button>
            </div>
            <div className="input-features">
              <div className="input-feature">
                <Calendar className="input-feature__icon" />
                <span className="input-feature__text">Disponibilidad en tiempo real</span>
              </div>
              <div className="input-feature">
                <CreditCard className="input-feature__icon" />
                <span className="input-feature__text">Reservas seguras</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};