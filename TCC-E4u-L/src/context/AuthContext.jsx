import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);

    

        useEffect(() => {
      //Modo desenvolvimento
        if (import.meta.env.DEV && !localStorage.getItem('authToken')) {
            console.warn(
              "MODO DE DESENVOLVIMENTO ATIVO: Usuário falso foi injetado para pular o login. Para testar o login real, use a função 'Sair' e vá para a página /login."
            );
            setUsuario({
                nome: "Usuário Dev",
                email_usuario: "dev@teste.com",
                tipo_usuario: "admin",
            });
            setLoading(false);
            return;
        }

        const carregarDadosUsuario = async () => {
            const tokenAtual = localStorage.getItem('authToken');
            if (tokenAtual) {
                try {
                    const resposta = await axios.get('http://localhost:3001/api/auth/profile', {
                        headers: { 'Authorization': `Bearer ${tokenAtual}` }
                    });
                    setUsuario(resposta.data);
                } catch (error) {
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUsuario(null);
                    console.error("Sessão inválida. Logout forçado.");
                }
            }
            setLoading(false);
        };
        carregarDadosUsuario();
    }, [token]);

    //Login com Email e Senha
    const login = async (email, senha) => {
        const credencialUsuario = await signInWithEmailAndPassword(auth, email, senha);
        const novoToken = await credencialUsuario.user.getIdToken();
        localStorage.setItem('authToken', novoToken);
        setToken(novoToken); 
    };

    // Logout
    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('authToken');
        setUsuario(null);
        setToken(null);
    };

    // Login com o google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const resultado = await signInWithPopup(auth, provider);
            const novoToken = await resultado.user.getIdToken();
            
            const resposta = await axios.get('http://localhost:3001/api/auth/profile', {
                headers: { 'Authorization': `Bearer ${novoToken}` }
            });

            localStorage.setItem('authToken', novoToken);
            setToken(novoToken); 
            setUsuario(resposta.data);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                await signOut(auth);
                throw new Error('Usuário não cadastrado. Por favor, use a página de cadastro.');
            }
            console.error("Erro durante o login com Google:", error);
            throw error;
        }
    };

    // Inicio do cadastro com o google
    const startGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const resultado = await signInWithPopup(auth, provider);
            return resultado.user; // Retorna os dados do Google para o formulário
        } catch (error) {
            alert(`Ocorreu um erro!
    
            Código: ${error.code}
            Mensagem: ${error.message}`);
            
            console.error("Erro ao iniciar cadastro com Google:", error);
            throw error;
        }
    };


    const valor = {
        usuario,
        token,
        loading,
        login,
        logout,
        signInWithGoogle,    
        startGoogleSignUp, 
         setToken, 
    };

    return (
        <AuthContext.Provider value={valor}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}