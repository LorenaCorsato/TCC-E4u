

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Inicio from './pages/inicio.jsx';
import LandingPage from './pages/inicio.jsx';
import Login from './pages/login.jsx';
import PagSolar from './pages/plaSolar.jsx';
import PagCarbono from './pages/pegCarbono.jsx';
import Questionario from './pages/questionario.jsx';
import CadastroFisico from './pages/cadastroFisico.jsx';
import CadastroJuridico from './pages/cadastroJuridico.jsx';
import ArtigosSol from './pages/artigosSol.jsx';
import Grafico from './pages/grafico.jsx';
import Historico from './pages/historico.jsx';

import Layout from './components/Layout.jsx'; 

import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroPessoaFisica" element={<CadastroFisico />} />
        <Route path="/cadastroPessoaJuridica" element={<CadastroJuridico />} />

      
        <Route element={<Layout />}> 
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/placaSolar" element={<PagSolar />} />
          <Route path="/pegadaCarbono" element={<PagCarbono />} />
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/artigosSol" element={<ArtigosSol />} />
          <Route path="/grafico" element={<Grafico />} />
          <Route path="/historico" element={<Historico />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);