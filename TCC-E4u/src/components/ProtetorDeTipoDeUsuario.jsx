import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtetorDeTipoDeUsuario({ children, tipoPermitido }) {
    const { usuario, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (usuario && usuario.tipo_usuario === tipoPermitido) {
        return children;
    }

    
    return <Navigate to="/landingPage" replace />;
}