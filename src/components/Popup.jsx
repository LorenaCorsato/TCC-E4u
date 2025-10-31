import React, { useEffect } from 'react';
import '../styles/components/Popup.css';

const Popup = ({ title, initialContent, fullContent, isOpen, onToggle, onClose }) => {

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        onClose();
      }
    };

 
    window.addEventListener('scroll', handleScroll, { passive: true });

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]); 
                        

  return (
    <div className="popup-container">
      <div 
        className={`popup-card ${isOpen ? 'expanded' : ''}`}
      >
        
        {!isOpen && (
          <div onClick={onToggle}> 
            <h3>{title}</h3>
            <p>{initialContent}</p>
          </div>
        )}

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