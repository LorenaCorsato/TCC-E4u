import React from 'react';
import '../styles/components/perguntasCarb.css';

export default function PerguntasCarb({ name, enunciadoPergunta, alternativas }) {
  return (
    <div className="card-pergunta">
      <div className="pergunta-content">
        <p className="pergunta-enunciado">{enunciadoPergunta}</p>
        <div className="opcoes-container">
          {alternativas.map((alternativa, index) => (
            <label
              key={index}
              htmlFor={`${name}-alternativa${index + 1}`}
              className="opcao-label"
            >
              <input
                type="radio"
                id={`${name}-alternativa${index + 1}`}
                name={name}
                value={alternativa}
                className="opcao-radio"
              />
              <span className="opcao-texto">{alternativa}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
