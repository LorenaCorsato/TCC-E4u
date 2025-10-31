import { useNavigate } from 'react-router-dom';
import '../styles/components/botao.css';

export default function Button({ href, btnNome, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (href) {
            navigate(href); 
        }
    };

    return (
        <button onClick={handleClick} className="btn">
            {btnNome}
        </button>
    );
}
