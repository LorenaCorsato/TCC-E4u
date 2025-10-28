
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navegacao';
import CabecalhoPublico from './cabecalhoPublico'; 
import { useAuth } from '../context/AuthContext';
import Acessibilidade from './Acessibilidade'; 
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