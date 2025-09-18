import React from 'react';
import '../styles/components/perguntasCarb.css';

export default function PerguntasCarb({
  name,
  enunciadoPergunta,
  alternativas,
  onChange,
  selectedValue, // Adicione para controlar o valor selecionado
}) {
  return (
    <div className="card-pergunta">
      <p className="pergunta-enunciado">{enunciadoPergunta}</p>
      <div className="alternativas">
        {alternativas.map((alternativa, index) => (
          <label key={index} className="alternativa">
            <input
              type="radio"
              name={name}
              value={alternativa}
              onChange={onChange}
              checked={selectedValue === alternativa} // Controla qual opção está marcada
            />
            <span>{alternativa === "Nao" ? "Não" : alternativa}</span>
          </label>
        ))}
      </div>
    </div>
  );
}