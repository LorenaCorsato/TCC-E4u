import '../styles/components/botaoIcone.css'

export default function BotaoIcone( {onBtnIcone, srcBtnIcone, textoBtnIcone} ) {
    return (
        <>
        <button className="btnIcone" onClick={onBtnIcone}>
            <img className="imgBtnIcone" src={srcBtnIcone} />
            <p className="textoBtnIcone"><span className="linha">{textoBtnIcone}</span></p>
        </button>
        </>
    )
}