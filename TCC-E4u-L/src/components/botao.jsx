import { useNavigate } from 'react-router-dom';
import '../styles/components/botao.css';

export default function Button({ href, btnNome, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // executa ação personalizada (ex: enviar formulário)
        } else if (href) {
            navigate(href); // redireciona
        }
    };

    return (
        <button onClick={handleClick} className="btn">
            {btnNome}
        </button>
    );
}
