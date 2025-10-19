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
import Artigo01 from './pages/artigo/artigo01.jsx';
import Artigo02 from './pages/artigo/artigo02.jsx';
import Artigo03 from './pages/artigo/artigo03.jsx';
import Artigo05 from './pages/artigo/artigo05.jsx';
import Artigo06 from './pages/artigo/artigo06.jsx';
import Artigo07 from './pages/artigo/artigo07.jsx';
import Artigo08 from './pages/artigo/artigo08.jsx';
import Grafico from './pages/grafico.jsx';
import Historico from './pages/historico.jsx';
import Resultado from './pages/resultadoCarbono.jsx';
import ResultadoSolar from './pages/resultadoSolar.jsx';
import Home from './pages/home.jsx';


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
            <Route path="/artigo01" element={<Artigo01 />} />
            <Route path="/artigo02" element={<Artigo02 />} />
            <Route path="/artigo03" element={<Artigo03 />} />
            <Route path="/artigo05" element={<Artigo05 />} />
            <Route path="/artigo06" element={<Artigo06 />} />
            <Route path="/artigo07" element={<Artigo07 />} />
            <Route path="/artigo08" element={<Artigo08 />} />
            <Route path="/grafico" element={<Grafico />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/resultadoSolar" element={<ResultadoSolar />} />
             <Route path="/home" element={<Home />} />

          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);