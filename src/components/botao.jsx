import { useNavigate } from 'react-router-dom'
import '../styles/components/botao.css'

export default function Button({ href, btnNome }) {
    const navigate = useNavigate()
    return (
        <>
        <button onClick={() => navigate(href)} className="btn">{btnNome}</button>
        </>
    )
}