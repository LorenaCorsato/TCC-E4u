import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inicio from './pages/inicio.jsx'
import LandingPage from './pages/landingPage.jsx'
import Login from './pages/login.jsx'
import PagSolar from './pages/plaSolar.jsx'
import PagCarbono from './pages/pegCarbono.jsx'
import Questionario from './pages/questionario.jsx'
import CadastroFisico from './pages/cadastroFisico.jsx'
import CadastroJuridico from './pages/cadastroJuridico.jsx'
import ArtigosSol from './pages/artigosSol.jsx'
import Grafico from './pages/grafico.jsx'
import Historico from './pages/historico.jsx'
import './index.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <BrowserRouter>
      <Routes>
        <Route element={<Inicio />} path="/" />
        <Route element={<LandingPage />} path="/landingPage" />
        <Route element={<Login />} path="/login" />
        <Route element={<CadastroFisico />} path="/cadastroPessoaFisica" />
        <Route element={<CadastroJuridico />} path="/cadastroPessoaJuridica" />
        <Route element={<PagSolar />} path="/placaSolar" />
        <Route element={<PagCarbono />} path="/pegadaCarbono" />
        <Route element={<Questionario />} path="/questionario" />
        <Route element={<ArtigosSol />} path="/artigosSol" />
        <Route element={<Grafico />} path="/grafico" />
        <Route element={<Historico />} path="/historico" />
      </Routes>
      </BrowserRouter>
  </>
)
