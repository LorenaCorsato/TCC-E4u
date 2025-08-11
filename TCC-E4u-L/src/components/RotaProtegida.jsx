import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function RotaProtegida({ children }) {
    const { usuario, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Carregando página...</div>;
    }

    if (!usuario) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}