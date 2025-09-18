import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'; 
// 1. Importe os novos componentes de autenticação
import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';

// Suas páginas
import Inicio from './pages/inicio.jsx';
import LandingPage from './pages/inicio.jsx';
import Login from './pages/login.jsx';
import PagSolar from './pages/plaSolar.jsx';
import PagCarbono from './pages/pegCarbono.jsx';
import Questionario from './pages/questionario.jsx';
import QuestionarioJ from './pages/questionarioJ.jsx';
import CadastroFisico from './pages/cadastroFisico.jsx';
import CadastroJuridico from './pages/cadastroJuridico.jsx';
import ArtigosSol from './pages/artigosSol.jsx';
import Grafico from './pages/grafico.jsx';
import Historico from './pages/historico.jsx';
import Resultado from './pages/resultadoCarbono.jsx';


import EsqueceuSenha from './pages/esqueceuSenha.jsx'; // Importe da nova página


import Layout from './components/Layout.jsx'; 



ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Grupo 1: Rotas públicas que NÃO usam o Layout principal (ex: tela cheia) */}
          <Route path="/login" element={<Login />} />
          <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
          <Route path="/cadastroPessoaFisica" element={<CadastroFisico />} />
          <Route path="/cadastroPessoaJuridica" element={<CadastroJuridico />} />

          {/* Grupo 2: Rotas públicas QUE USAM o Layout (NavBar, etc.) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/landingPage" element={<LandingPage />} />
            {/* Se você tiver outras páginas públicas como "Sobre" ou "Contato", elas iriam aqui */}
          </Route>
          
          {/* Grupo 3: Rotas PRIVADAS que usam o Layout e exigem login */}
          <Route element={<RotaProtegida><Layout /></RotaProtegida>}> 
            <Route path="/placaSolar" element={<PagSolar />} />
            <Route path="/pegadaCarbono" element={<PagCarbono />} />
            <Route path="/questionario" element={<Questionario />} />
            <Route path="/questionarioJ" element={<QuestionarioJ />} />
            <Route path="/artigosSol" element={<ArtigosSol />} />
            <Route path="/grafico" element={<Grafico />} />
            <Route path="/historico" element={<Historico />} />
                <Route path="/resultado" element={<Resultado />} />

          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);