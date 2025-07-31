// src/components/Popup.js
import React from 'react';
import '../styles/components/Popup.css'; // Importa os estilos CSS para o componente

/**
 * Componente Popup reutilizável.
 * @param {object} props - As propriedades do componente.
 * @param {string} props.title - O título do pop-up.
 * @param {string} props.initialContent - O conteúdo visível quando o pop-up está fechado.
 * @param {string} props.fullContent - O conteúdo completo visível quando o pop-up está aberto.
 */
const Popup = ({ title, initialContent, fullContent, isOpen, onToggle, onClose }) => {
  return (
    <div className="popup-container">
      {/* O card do pop-up, com a classe 'expanded' adicionada quando está aberto */}
      <div className={`popup-card ${isOpen ? 'expanded' : ''}`} onClick={onToggle} onMouseLeave={onClose} >
        <h3>{title}</h3>
        {/* Conteúdo inicial visível apenas quando o pop-up está fechado */}
        {!isOpen && <p>{initialContent}</p>}
        {/* Conteúdo completo visível apenas quando o pop-up está aberto */}
        {isOpen && (
          <div className="full-content">
            <p>{fullContent}</p>
            {/* Você pode adicionar mais elementos aqui, como imagens, botões, etc. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
