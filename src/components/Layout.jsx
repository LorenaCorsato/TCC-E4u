// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

// Supondo que você tenha um componente Navbar.
// Se o nome ou caminho for diferente, ajuste a linha abaixo.
import Navbar from './navegacao'; 

export default function Layout() {
  return (
    <>
      {/* A Navbar agora faz parte deste layout e aparecerá em todas as páginas aninhadas */}
      <Navbar />

      {/* O <Outlet> é um espaço reservado onde o React Router irá renderizar 
          a página da rota atual (como LandingPage, Grafico, etc.) */}
      <main>
        <Outlet />
      </main>

      {/* Você poderia adicionar um Footer aqui também, se quisesse */}
    </>
  );
}