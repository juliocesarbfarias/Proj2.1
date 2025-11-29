// src/pages/SimuladoDetalhesPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// import { dadosSimulado } from '../data/dadosSimulado.js'; // <-- MUDANÇA: Não precisamos mais disso aqui
import SelecaoSimulado from '../components/SelecaoSimulado.jsx';

function SimuladoDetalhesPage() {
  const { id } = useParams(); // Pega 'unicamp', 'fuvest', etc. da URL
  const navigate = useNavigate();
  // const questoesVestibular = dadosSimulado[id] || []; // <-- MUDANÇA: Removido
  
  // <-- MUDANÇA: Removida a lógica de 'materiasDisponiveis'
  // const materiasDisponiveis = [...new Set(questoesVestibular.map(q => q.materia))];

  const handleIniciarSimulado = (opcoes) => {
    // Esta função continua igual, mas agora 'opcoes' terá um formato diferente
    // Ex: { dificuldade: 'medio', materia: 'Física', numQuestoes: 5 }
    // O 'usarAPI: true' que você tinha é perfeito para o próximo passo
    navigate(`/simulado/${id}`, {
      state: {
        opcoes, 
        usarAPI: true 
      },
    });
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center text-uppercase">{id}</h1>
      <p className="lead text-center">Selecione as opções para começar</p>
      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: '500px', width: '100%' }}>
            <SelecaoSimulado
                // <-- MUDANÇA: Props removidas, o componente não precisa mais delas
                // materiasDisponiveis={materiasDisponiveis}
                // questoesDisponiveis={questoesVestibular}
                onIniciar={handleIniciarSimulado}
            />

        </div>
      </div>
    </Container>
  );
}

export default SimuladoDetalhesPage;