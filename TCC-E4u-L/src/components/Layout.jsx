// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';


import Navbar from './navegacao'; 

export default function Layout() {
  return (
    <>
      <Navbar />

     
      <main>
        <Outlet />
      </main>

    </>
  );
}