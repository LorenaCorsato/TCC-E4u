import '../../styles/pages/artigo.css'
import Footer from '../../components/rodape.jsx'

export default function Artigo10() {
    return (
        <>
        <div className="conteudoArtigo1">
            <h1>Inversores e Transformadores</h1>

            <p>&nbsp;É comum que pessoas ou empresas instalem sistemas fotovoltaicos e comprem componentes sem saber suas funções especificas, dependendo da informação fornecida por aqueles contratados para instalar o sistema, isso pode atrapalhar tanto no momento da compra quanto em uma futura manutenção caso seja necessário. Neste artigo, apresentaremos e explicaremos dois componentes de sistemas fotovoltaicos.</p>
            <br/>
            <p>&nbsp;<strong>Inversores:</strong> O inversor é um item essencial dentro do sistema de energia solar, sua função é converter a energia elétrica gerada pelos painéis de corrente continua em corrente alternada, possibilitando o uso da energia elétrica, além de garantir segurança ao medir a quantidade de energia produzida. Em residências, inversores são tipicamente instalados próximos ao quadro de energia, em um local protegido das condições climáticas, em usinas e empresas, geralmente se é construído um espaço para os inversores, por serem maiores e ocuparem mais espaço físico.</p>
            <br/>
            <p>&nbsp;Existem diversos tipos de inversores, apesar de todos exercerem a mesma função geral, seus modelos se encaixam melhor para tarefas específicas:</p>
            <p>•	Inversor solar on-grid: O inversor on-grid é o modelo mais utilizado em casas e empresas, pois se conecta diretamente ao sistema elétrico da construção, e é projetado para desligar rapidamente caso o mesmo venha a cair.</p>
            <p>•	Inversor solar off-grid: O inversor off-grid é um sensor utilizado em sistemas desconectados da rede elétrica, energizados por meio de baterias, normalmente longe da rede elétrica. Seu tamanho varia dependendo da aplicação, com os menores possuindo potencias de 150W a 200W e sendo facilmente transportáveis. Os inversores que possuem uma potência acima de 200W são maiores e mais pesados, exigindo uma instalação permanente.</p>
            <p>•	Inversor solar string: O inversor string representa 50% dos inversores do mundo, recebendo esse nome por possuir múltiplos conectores. Dependendo do tamanho da instalação pode haver mais de um inversor string.</p>
            <p>•	Inversor solar híbrido: O inversor híbrido pode operar tanto como um inversor on-grid como um off-grid, podendo ser conectado à rede ou em sistemas fora dela. Além de ser um inversor com funcionamento mais complexo, podendo, por exemplo, ser programado para injetar energia na rede em momentos que a energia valha mais.</p>
            <p>•	Microinversor solar: O microinversor é feito para ser instalado diretamente na placa, com cada uma possuindo um inversor operando de forma independente.</p>
            <p>•	Inversor solar central: Inversores solares centrais são feitos para aplicações de grande porte, como edifícios, usinas solares, entre outros.</p>
            <br/>
            <p>&nbsp;<strong>Transformadores:</strong> O transformador é um dispositivo essencial em grande parte dos sistemas de energia solar. Sua função é ajustar a tensão da corrente elétrica gerada pelo inversor e direcionar a quantidade correta e segura para o sistema de rede elétrica da residência ou edifício, além de também contarem como sistema de segurança em caso de curto circuitos.</p>
        </div>

        <div className="creditosArtigo1">
            <h6>Gustavo Membrive</h6>
            <p>30/10/2025</p>
        </div>
        <Footer />
        </>
    )
}
