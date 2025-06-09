// No seu arquivo index.jsx ou main.jsx

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importe suas páginas
import Inicio from './pages/inicio.jsx';
import LandingPage from './pages/landingPage.jsx';
import Login from './pages/login.jsx';
import PagSolar from './pages/plaSolar.jsx';
import PagCarbono from './pages/pegCarbono.jsx';
import Questionario from './pages/questionario.jsx';
import CadastroFisico from './pages/cadastroFisico.jsx';
import CadastroJuridico from './pages/cadastroJuridico.jsx';
import ArtigosSol from './pages/artigosSol.jsx';
import Grafico from './pages/grafico.jsx';
import Historico from './pages/historico.jsx';

// 1. IMPORTE O NOVO COMPONENTE DE LAYOUT
import Layout from './components/Layout.jsx'; 
// (Ajuste o caminho se necessário)

import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* --- Rotas Públicas (Sem a Navbar principal) --- */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroPessoaFisica" element={<CadastroFisico />} />
        <Route path="/cadastroPessoaJuridica" element={<CadastroJuridico />} />

        {/* --- Rotas Protegidas/Internas (Com a Navbar principal) --- */}
        {/* 2. A Rota "Pai" que renderiza o Layout */}
        <Route element={<Layout />}> 
          {/* 3. As rotas "filhas" que serão exibidas dentro do Layout */}
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/placaSolar" element={<PagSolar />} />
          <Route path="/pegadaCarbono" element={<PagCarbono />} />
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/artigosSol" element={<ArtigosSol />} />
          <Route path="/grafico" element={<Grafico />} />
          <Route path="/historico" element={<Historico />} />
          {/* Adicione aqui qualquer outra página que precise da navegação */}
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);