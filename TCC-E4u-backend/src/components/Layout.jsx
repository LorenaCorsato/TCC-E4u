
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navegacao';
import CabecalhoPublico from './cabecalhoPublico'; // 1. Importe o novo cabeçalho
import { useAuth } from '../context/AuthContext';
import Acessibilidade from './Acessibilidade'; // 1. IMPORTE O COMPONENTE AQUI
import '../styles/components/layout.css'




export default function Layout() {


  const { usuario } = useAuth();

  return (
    <>
      {usuario ? <NavBar /> : <CabecalhoPublico />}
      
      <main className={usuario ? 'conteudo-com-navbar' : ''}>
        <Outlet />
      </main>

      <Acessibilidade />

    </>
  );
}