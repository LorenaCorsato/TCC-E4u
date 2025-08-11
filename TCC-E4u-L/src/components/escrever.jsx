import '../styles/components/escrever.css'

export default function Form({ formValor, id, type, value, onChange }) {
    return (
        <>
            <div className="form">
                <p>{formValor}</p>
                <input className="input" id={id} type={type} value={value} onChange={onChange} required />
            </div>
        </>
    )
}