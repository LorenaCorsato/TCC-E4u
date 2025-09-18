import React, { useEffect } from 'react';
import '../styles/components/Popup.css';

const Popup = ({ title, initialContent, fullContent, isOpen, onToggle, onClose }) => {

  // O useEffect irá "escutar" por eventos de scroll quando o pop-up estiver aberto
  useEffect(() => {
    // A função que será chamada quando houver scroll
    const handleScroll = () => {
      // Se o pop-up estiver aberto, ele será fechado
      if (isOpen) {
        onClose();
      }
    };

    // Adiciona o listener de evento de scroll quando o componente "monta" e isOpen é true
 
    window.addEventListener('scroll', handleScroll, { passive: true });

    // A função de "cleanup" do useEffect.
    // Ela é chamada quando o componente "desmonta" ou antes do próximo re-render.
    // Isso é crucial para remover o listener e evitar bugs e vazamento de memória.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]); // A dependência [isOpen, onClose] garante que o useEffect
                        // seja executado apenas quando essas props mudarem.

  return (
    <div className="popup-container">
      <div 
        className={`popup-card ${isOpen ? 'expanded' : ''}`}
      >
        
        {/* Conteúdo inicial: visível e clicável apenas quando o popup está fechado. */}
        {!isOpen && (
          <div onClick={onToggle}> 
            <h3>{title}</h3>
            <p>{initialContent}</p>
          </div>
        )}

        {/* Conteúdo completo: visível apenas quando o popup está aberto. */}
        {isOpen && (
          <div className="full-content"> 
            <button className="popup-close-btn" onClick={onClose} aria-label="Fechar popup">×</button>
            <h3>{title}</h3>
            <p>{fullContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;