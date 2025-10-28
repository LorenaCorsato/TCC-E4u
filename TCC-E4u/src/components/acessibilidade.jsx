import { useState, useEffect } from "react";
import '../styles/components/acessibilidade.css';

const tiposDeFiltro = [
    { id: 'nenhum', nome: 'Padrão' },
    { id: 'protanopia', nome: 'Protanopia' },
    { id: 'deuteranopia', nome: 'Deuteranopia' },
    { id: 'tritanopia', nome: 'Tritanopia' },
    { id: 'acromatopsia', nome: 'Acromatopsia' }
];

export default function Acessibilidade() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [filtroAtivo, setFiltroAtivo] = useState('nenhum');
    
  
    const aplicarFiltro = (idFiltro) => {
        setFiltroAtivo(idFiltro);
    };

   
    useEffect(() => {
        const elementoHtml = document.documentElement;
        tiposDeFiltro.forEach(filtro => {
            if (filtro.id !== 'nenhum') {
                elementoHtml.classList.remove(`filtro-${filtro.id}`);
            }
        });

        if (filtroAtivo !== 'nenhum') {
            elementoHtml.classList.add(`filtro-${filtroAtivo}`);
        }
    }, [filtroAtivo]);

   
    return (
        <div className="acessibilidade">
            <div className={`acessibilidadeDropDown ${menuAberto ? "aberto" : ""}`}>
                <h4>Filtros de daltonismo</h4>
                {tiposDeFiltro.map(filtro => (
                    <button
                        key={filtro.id}
                        onClick={() => aplicarFiltro(filtro.id)}
                        className={filtroAtivo === filtro.id ? 'ativo' : ''}
                    >
                        {filtro.nome}
                    </button>
                ))}

               

            </div>

            <button onClick={() => setMenuAberto(!menuAberto)} className="btnAcessibilidade">
                <img src="/src/assets/Acessibilidade-removebg-preview.png" alt="Ícone de Acessibilidade" />
            </button>
        </div>
    );
}