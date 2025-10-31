import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from './modal.jsx'; 
import StarRating from './StarRating'; 
import StarRatingInput from './StarRatingInput'; 
import '../styles/components/modalAvaliacoes.css'; 

export default function ModalAvaliacoes({ placa, isOpen, onClose }) {
    const { token } = useAuth();
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [minhaNota, setMinhaNota] = useState(0);
    const [minhaOpiniao, setMinhaOpiniao] = useState('');
    const [mensagemForm, setMensagemForm] = useState({ texto: '', tipo: '' });

    const fetchAvaliacoes = async () => {
        try {
            setLoading(true);
            const resposta = await axios.get(
                `http://localhost:3001/api/avaliacoes/${placa.id}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setAvaliacoes(resposta.data);
        } catch (error) {
            console.error("Erro ao carregar avaliações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAvaliacoes();
            setMinhaNota(0);
            setMinhaOpiniao('');
            setMensagemForm({ texto: '', tipo: '' });
        }
    }, [isOpen, placa.id, token]);

    const handleSubmitAvaliacao = async (e) => {
        e.preventDefault();
        if (minhaNota === 0) {
            setMensagemForm({ texto: 'Por favor, selecione de 1 a 5 estrelas.', tipo: 'erro' });
            return;
        }
        if (minhaOpiniao.trim() === '') {
            setMensagemForm({ texto: 'Por favor, escreva sua opinião.', tipo: 'erro' });
            return;
        }

        try {
            await axios.post(
                `http://localhost:3001/api/avaliacoes/${placa.id}`,
                { nota: minhaNota, opiniao: minhaOpiniao },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setMensagemForm({ texto: 'Avaliação enviada com sucesso!', tipo: 'sucesso' });
            setMinhaNota(0);
            setMinhaOpiniao('');
            fetchAvaliacoes(); 
        } catch (error) {
            setMensagemForm({ texto: 'Erro ao enviar sua avaliação. Tente novamente.', tipo: 'erro' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-avaliacoes-container">
                <h2>Avaliações para {placa.modelo}</h2>
                
                <form onSubmit={handleSubmitAvaliacao} className="form-avaliacao">
                    <h4>Deixe sua avaliação</h4>
                    <StarRatingInput rating={minhaNota} setRating={setMinhaNota} />
                    <textarea
                        placeholder="Escreva sua opinião sobre este produto..."
                        value={minhaOpiniao}
                        onChange={(e) => setMinhaOpiniao(e.target.value)}
                    />
                    <button type="submit">Enviar Avaliação</button>
                    {mensagemForm.texto && (
                        <p className={`mensagem-form ${mensagemForm.tipo}`}>
                            {mensagemForm.texto}
                        </p>
                    )}
                </form>

                <div className="lista-avaliacoes">
                    <h4>O que outros usuários dizem</h4>
                    {loading ? (
                        <p>Carregando avaliações...</p>
                    ) : avaliacoes.length === 0 ? (
                        <p>Este produto ainda não tem avaliações. Seja o primeiro!</p>
                    ) : (
                        avaliacoes.map((ava, index) => (
                            <div key={index} className="avaliacao-item">
                                <div className="avaliacao-header">
                                    <strong>{ava.nome_usuario || 'Usuário Anônimo'}</strong>
                                    <StarRating rating={ava.nota} />
                                </div>
                                <p className="avaliacao-opiniao">"{ava.opiniao}"</p>
                                <span className="avaliacao-data">
                                    {new Date(ava.data_avaliacao).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
}