import '../styles/components/rodape.css'

export default function Footer() {
    return (
        <>
            <div className="rodape">
                <div className="parteSuperior">
                    <div className="direitosReservados">
                        <p>&reg;2025 E4u LTDA. Todos os direitos reservados aos proprietários</p>
                    </div>
                </div>

                <div className="parteInferior">
                    <div className="duvidas">
                        <a href="#">Termos de uso e privacidade</a>
                        <a href="#">Segurança</a>
                        <a href="#">Dúvidas?</a>
                    </div>

                    <div className="redesSociais">
                        <p>Nos acompanhe</p>
                    </div>
                </div>
            </div>
        </>
    )
}