import { useNavigate } from 'react-router-dom';
import "../styles/components/cardBotao.css"
import Button from "./botao"

export default function CardBotao({ hrefCardBotao, srcCardBotao, tituloCardBotao, textoCardBotao, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (hrefCardBotao) {
            navigate(hrefCardBotao);
        }
    };

    return (
        <>

            <div className="cardBotao" onClick={handleClick}>
                <img src={srcCardBotao} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5>{tituloCardBotao}</h5>
                    <p>{textoCardBotao}</p>
                </div>
            </div>

        </>
    )
}