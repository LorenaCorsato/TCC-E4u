import '../../styles/pages/artigo.css'
import Footer from '../../components/rodape.jsx'

export default function Artigo() {
    return (
        <>
            <div className="conteudoArtigo1">
                <h1>Energia solar e legislação: entenda os impactos da lei 14.300/22</h1>
                <img className='imagemCheia1' src="src/assets/ImgArtigos/legislação.jpg" />
                <p>&nbsp;A Lei Federal nº 14.300/2022 é o Marco Legal da Geração Distribuída no Brasil, estabelecendo regras claras e segurança jurídica para a micro e minigeração de energia solar fotovoltaica, substituindo a Resolução Normativa 482/2012 da ANEEL. Ela introduziu um sistema de compensação de créditos de energia, mas também gradualmente implementou a cobrança do Fio B (O Fio B, ou fio de retorno, é um componente da tarifa de energia elétrica (TUSD) que remunera as concessionárias pelo uso da infraestrutura de distribuição de energia, como postes e cabos, mesmo quando o consumidor gera a própria energia) sobre a energia injetada na rede para os sistemas instalados após a sua entrada em vigor, com um período de transição que culmina em regras definitivas em 2029.</p>
                <br />

                <p>&nbsp;Principais pontos da Lei nº 14.300/2022:</p>
                <br />
                <p>●	Marco Legal da Geração Distribuída: Define as regras para a produção de energia pelos próprios consumidores a partir de fontes renováveis, como a solar.</p>
                <p>●	Criação do Sistema de Compensação de Energia Elétrica (SCEE): Permite que o excedente de energia gerada seja injetado na rede e se transforme em créditos para abater na conta de luz do consumidor.</p>
                <p>●	Regras de Transição para o Fio B: Para os sistemas instalados após janeiro de 2023, a lei introduz a cobrança gradual do custo de uso da rede (Fio B) sobre a energia injetada.</p>
                <p>●	Período de Transição: A cobrança do Fio B, que começou em 2023, aumenta escalonadamente até 2029, quando as regras definitivas para essa tarifa serão aplicadas.</p>
                <p>●	Proteção para Usuários Antigos: Os consumidores que já possuíam sistemas fotovoltaicos antes de a lei entrar em vigor, em 7 de janeiro de 2023, têm o direito adquirido de não pagarem o Fio B.</p>
                <p>●	Segurança Jurídica: A lei trouxe segurança para os investimentos em energia solar, estabelecendo um marco regulatório mais estável e previsível.</p>
                <br />
                <p>&nbsp;Com a Lei nº 14.300, o fator de simultaneidade se torna mais estratégico para reduzir custos, pois a energia injetada na rede passa a ter uma cobrança progressiva do custo de uso da infraestrutura (Fio B). Quanto maior o fator de simultaneidade, ou seja, maior o consumo instantâneo da energia gerada, menor será a quantidade de energia injetada na rede, e menor o impacto da cobrança do Fio B. Por isso, é importante ajustar o perfil de consumo para consumir a energia solar gerada durante o dia e evitar perdas financeiras. O fator de simultaneidade é a proporção da energia gerada por um sistema fotovoltaico que é consumida no mesmo momento. Uma energia com alta simultaneidade é consumida na hora, sem precisar ser injetada na rede.</p>
            </div>

            <div className="creditosArtigo1">
                <h6>Gabriela Prado</h6>
                <p>07/10/2025</p>
            </div>
            <Footer />
        </>
    )
}