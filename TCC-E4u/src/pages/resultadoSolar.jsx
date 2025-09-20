import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from "../components/botao";
import NavBar from "../components/navegacao";
import '../styles/pages/resultadoSolar.css';
import CardSlide from '../components/cardSlide'



export default function ResultadoSolar() {
    
    return (
        <>
            <NavBar />
            <div className="questionario">
                <div className="questionario-titulo"><h1>Questionário</h1></div>
                <div className="texto"><h1>Responda com sinceridade para um resultado mais próximo da sua realidade.</h1></div>
     <CardSlide />
        
            </div>
        </>
    );
}