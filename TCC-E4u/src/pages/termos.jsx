import '../styles/pages/termo.css'
import Footer from '../components/rodape.jsx'

export default function Termos() {
  return (
    <>
      <main className="conteudoArtigo">
        <article>
          <h1>Política de Privacidade e Segurança — E4U</h1>
          <p className="muted">Data da última atualização: 27 de outubro de 2025</p>

          <p>
            Levamos sua privacidade e segurança a sério. Esta Política descreve como
            coletamos, usamos, armazenamos, protegemos e tratamos seus dados pessoais ao
            utilizar nossa plataforma, em conformidade com a Lei Geral de Proteção de
            Dados — LGPD (Lei nº 13.709/2018). Ao criar uma conta ou utilizar qualquer
            funcionalidade do E4U, você declara estar ciente e de acordo com os termos
            descritos neste documento.
          </p>

          <h2>1. Quais Dados Coletamos?</h2>
          <p>Coletamos apenas os dados mínimos necessários para fornecer nossos serviços:</p>

          <h3>a) Informações de Cadastro</h3>
          <ul>
            <li>Nome completo</li>
            <li>Email</li>
            <li>CPF (Pessoa Física) ou CNPJ (Pessoa Jurídica)</li>
            <li>Token de autenticação (fornecido pelo Firebase)</li>
          </ul>
          <p className="warning">⚠ Senhas NÃO são armazenadas por nós. Toda autenticação é realizada e criptografada pela plataforma Google Firebase.</p>

          <h3>b) Dados fornecidos para cálculo de Pegada de Carbono</h3>
          <ul>
            <li>Pessoa Física: habitação, consumo de energia, transporte, viagens aéreas</li>
            <li>Pessoa Jurídica: frota de veículos, maquinário, consumo energético</li>
          </ul>
          <p>Apenas o resultado do cálculo é armazenado em nosso banco de dados.</p>

          <h3>c) Dados para o cálculo de Energia Solar</h3>
          <ul>
            <li>Consumo médio mensal de energia elétrica (kWh)</li>
            <li>CEP para identificar a região de irradiação solar</li>
          </ul>
          <p>Usados apenas para calcular as placas necessárias, não são salvos em nosso banco de dados.</p>

          <h3>d) Dados públicos de Avaliações</h3>
          <ul>
            <li>Nota (1 a 5 estrelas)</li>
            <li>Comentário</li>
            <li>Nome de Usuário vinculado à avaliação</li>
          </ul>
          <p>Somente informações inseridas em avaliações podem ser exibidas publicamente.</p>

          <h2>2. Bases Legais da Coleta</h2>
          <p>Utilizamos as seguintes bases legais da LGPD:</p>

          <table>
            <thead>
              <tr>
                <th>Finalidade</th>
                <th>Base Legal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cadastro, autenticação e acesso</td>
                <td>Art. 7º, V — Execução de contrato</td>
              </tr>
              <tr>
                <td>Cálculos de carbono e placas</td>
                <td>Art. 7º, V — Execução de contrato</td>
              </tr>
              <tr>
                <td>Exibição pública de avaliações</td>
                <td>Art. 7º, I — Consentimento do titular</td>
              </tr>
              <tr>
                <td>Armazenamento de histórico de cálculos</td>
                <td>Art. 7º, IX — Legítimo interesse</td>
              </tr>
            </tbody>
          </table>

          <p>A qualquer momento, o usuário pode retirar seu consentimento relativo às avaliações públicas.</p>

          <h2>3. Por que e como usamos seus dados?</h2>
          <p>Utilizamos os dados para:</p>
          <ul>
            <li>✔ Criar e gerenciar sua conta</li>
            <li>✔ Realizar os cálculos personalizados da plataforma</li>
            <li>✔ Melhorar a experiência e exibir histórico de evolução</li>
            <li>✔ Tornar avaliações disponíveis para outros usuários</li>
          </ul>
          <p>Jamais utilizamos seus dados para fins discriminatórios ou comerciais indevidos.</p>

          <h2>4. Compartilhamento de Dados</h2>
          <p>Não vendemos seus dados. O compartilhamento é feito somente com:</p>
          <ul>
            <li>Google Firebase: autenticação segura</li>
            <li>APIs públicas de geolocalização: apenas para traduzir CEP em coordenadas (sem identificação do usuário)</li>
          </ul>
          <p>Se for exigido por lei ou ordem judicial, poderemos fornecer informações às autoridades competentes.</p>

          <h2>5. Segurança e Proteção dos Dados</h2>
          <p>Tomamos medidas técnicas e organizacionais rigorosas:</p>
          <ul>
            <li>🔐 Criptografia de senha via Firebase</li>
            <li>🔐 CPF e CNPJ criptografados e protegidos no banco de dados</li>
            <li>🛡 Rotas de API protegidas por autenticação e tokens válidos</li>
            <li>🚫 Acesso interno restrito e monitorado</li>
          </ul>

          <h2>6. Prazo de Retenção</h2>
          <p>
            Os dados serão mantidos enquanto o usuário:
          </p>
          <ul>
            <li>Possuir conta ativa</li>
            <li>Não exercer o direito de exclusão</li>
          </ul>
          <p>Após a solicitação de exclusão, os dados serão eliminados de forma segura e irreversível em até 30 dias.</p>

          <h2>7. Direitos do Titular</h2>
          <p>Você pode, a qualquer momento:</p>
          <ul>
            <li>✔ Acessar seus dados</li>
            <li>✔ Corrigir ou atualizar dados incompletos</li>
            <li>✔ Solicitar a exclusão da conta</li>
            <li>✔ Revogar consentimento (avaliações públicas)</li>
            <li>✔ Solicitar portabilidade dos dados</li>
            <li>✔ Saber com quem seus dados foram compartilhados</li>
          </ul>
          <p>Para exercer seus direitos: <strong>equipee4u@gmail.com</strong></p>

          <h2>8. Resposta a Incidentes de Segurança</h2>
          <p>Em caso de violação de dados pessoais, nos comprometemos a:</p>
          <ul>
            <li>Notificar os titulares afetados</li>
            <li>Informar a ANPD quando exigido pela LGPD</li>
            <li>Tomar medidas imediatas para contenção e prevenção</li>
          </ul>

          <h2>9. Cookies e Tecnologias de Monitoramento</h2>
          <p>Atualmente, não utilizamos cookies de rastreamento ou ferramentas de analytics. Caso sejam implementados futuramente, esta política será atualizada e o consentimento será solicitado ao usuário.</p>

          <h2>10. Alterações desta Política</h2>
          <p>Podemos atualizar esta política a qualquer momento, por motivos legais ou melhorias tecnológicas. Sempre publicaremos a versão atualizada nesta página. Recomendamos revisão periódica para conhecimento de mudanças.</p>

          <h2>11. Contato e Encarregado/DPO</h2>
          <p>
            Qualquer dúvida sobre esta política ou seus dados pessoais pode ser enviada para:
            <br />
            Encarregada de Dados (DPO): Lorena Gonçalves Ribeiro
            <br />
            📩 Contato: <strong>equipee4u@gmail.com</strong>
          </p>

          <hr />

          <p style={{ fontWeight: 600 }}>
            Sua segurança é essencial para nós. Estamos comprometidos com transparência, proteção de dados e respeito à sua privacidade.
            Bem-vindo ao E4U - juntos pela sustentabilidade! 🌱⚡
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}