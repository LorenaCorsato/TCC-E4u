import '../styles/components/rodape.css'

export default function Footer() {
    return (
            <div className="rodape">
                <div className="parteSuperior">
                    <div className="direitosReservados">
                        <p>&reg;2025 E4u LTDA. Todos os direitos reservados aos proprietários</p>
                   
                        <p className="citacao-dados">
                            Fonte dos dados de irradiação: <a href="http://labren.ccst.inpe.br/" target="_blank" rel="noopener noreferrer">Atlas Brasileiro de Energia Solar, INPE, 2017.</a>
                        </p>
                        
                    </div>
                </div>

                <div className="parteInferior">
                    <div className="duvidas">
                        <a href="/termos">Termos de uso e privacidade</a>
                        <a href="/duvidas">Dúvidas?</a>
                    </div>

                    <div className="redesSociais">
                        <p>Nos acompanhe</p>
                        <a href=""><img src="src/assets/instagram.png" style={{height:"2rem", margin:"0.1rem"}}/></a>
                        <a href=""><img src="src/assets/facebook.png" style={{height:"2rem", margin:"0.1rem"}}/></a>
                        <a href="https://x.com/EquipeE4u"><img src="src/assets/twitterx.png" style={{height:"2rem", margin:"0.1rem"}}/></a>
                        <a href=""><img src="src/assets/youtube.png" style={{height:"2rem", margin:"0.1rem"}}/></a>
                    </div>
                </div>
            </div>
    
    )
}