import React from 'react';
import '../styles/components/Popup.css';

const Popup = ({ title, initialContent, fullContent, isOpen, onToggle, onClose }) => {
  return (
    <div className="popup-container">
      {/* O card do pop-up, com a classe 'expanded' quando aberto */}
      <div 
        className={`popup-card ${isOpen ? 'expanded' : ''}`}
        // Evento de fechar: só é ativado se o popup estiver aberto
        onMouseLeave={isOpen ? onClose : undefined} 
      >
        
        {/*
          Conteúdo inicial: visível e clicável apenas quando o popup está fechado.
          O `onClick` aqui garante que a abertura só aconteça com um clique.
        */}
        {!isOpen && (
          <div onClick={onToggle}>
            <h3>{title}</h3>
            <p>{initialContent}</p>
          </div>
        )}

        {/* Conteúdo completo: visível apenas quando o popup está aberto. */}
        {isOpen && (
          <div className="full-content">
            <h3>{title}</h3>
            <p>{fullContent}</p>
            {/* Você pode adicionar outros elementos aqui */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;