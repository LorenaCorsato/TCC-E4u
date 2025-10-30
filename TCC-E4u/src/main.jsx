import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'; 

import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import ProtetorDeTipoDeUsuario from './components/ProtetorDeTipoDeUsuario'; 
import ScrollToTop from './components/ScrollToTop'; 

// Páginas
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
import Artigo09 from './pages/artigo/artigo09.jsx';
import Artigo10 from './pages/artigo/artigo10.jsx';
import Grafico from './pages/grafico.jsx';
import Historico from './pages/historico.jsx';
import Resultado from './pages/resultadoCarbono.jsx';
import ResultadoSolar from './pages/resultadoSolar.jsx';
import Home from './pages/home.jsx';
import EsqueceuSenha from './pages/esqueceuSenha.jsx';
import Termos from './pages/termos.jsx';
import Duvidas from './pages/duvidas.jsx';

import Layout from './components/Layout.jsx'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop /> 
        <Routes>

          {/*Rotas públicas de tela cheia */}
          <Route path="/login" element={<Login />} />
          <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
          <Route path="/cadastroPessoaFisica" element={<CadastroFisico />} />
          <Route path="/cadastroPessoaJuridica" element={<CadastroJuridico />} />

          {/*Rotas públicas com Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/duvidas" element={<Duvidas />} />
          </Route>
          
          {/*Rotas privadas  */}
          <Route element={<RotaProtegida><Layout /></RotaProtegida>}> 
            
            {/* Rotas protegidas por tipo de usuário */}
            <Route 
              path="/questionario" 
              element={
                <ProtetorDeTipoDeUsuario tipoPermitido="fisica">
                  <Questionario />
                </ProtetorDeTipoDeUsuario>
              } 
            />
            <Route 
              path="/questionarioJ" 
              element={
                <ProtetorDeTipoDeUsuario tipoPermitido="juridica">
                  <QuestionarioJ />
                </ProtetorDeTipoDeUsuario>
              } 
            />

            {/* O resto das rotas privadas (acessíveis para ambos os tipos) */}
            <Route path="/placaSolar" element={<PagSolar />} />
            <Route path="/pegadaCarbono" element={<PagCarbono />} />
            <Route path="/artigosSol" element={<ArtigosSol />} />
            <Route path="/artigo01" element={<Artigo01 />} />
            <Route path="/artigo02" element={<Artigo02 />} />
            <Route path="/artigo03" element={<Artigo03 />} />
            <Route path="/artigo05" element={<Artigo05 />} />
            <Route path="/artigo06" element={<Artigo06 />} />
            <Route path="/artigo07" element={<Artigo07 />} />
            <Route path="/artigo08" element={<Artigo08 />} />
            <Route path="/artigo09" element={<Artigo09 />} />
            <Route path="/artigo10" element={<Artigo10 />} />
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