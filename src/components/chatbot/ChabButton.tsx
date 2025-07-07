import React from 'react';
import { MessageCircle } from 'lucide-react';
import './ChatButton.css';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`chat-button ${isOpen ? 'chat-button--hidden' : 'chat-button--visible'}`}
    >
      <MessageCircle className="chat-button__icon" />
      <div className="chat-button__notification">
        <span className="chat-button__notification-text">!</span>
      </div>
      <div className="chat-button__pulse"></div>
    </button>
  );
};