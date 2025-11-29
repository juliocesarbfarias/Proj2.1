import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Button, Row, Col, ProgressBar, Alert, Spinner } from 'react-bootstrap';

import { dadosSimulado } from '../data/dadosSimulado.js';
import QuestaoCard from '../components/QuestaoCard.jsx';
// Importação com extensão .js para evitar erros de build
import { apiPost } from '../services/apiClient.js';
// Importação com extensão .jsx para evitar erros de build
import { useAuth } from '../contexts/AuthContext.jsx'; 

// Função de Embaralhar
const embaralharArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function SimuladoPage() {
  const { id } = useParams(); // unicamp, fuvest, ...
  const location = useLocation();
  const auth = useAuth(); // Pega o contexto de autenticação

  const opcoes = location.state?.opcoes || { dificuldade: 'todas', materia: '', numQuestoes: 5 };
  const usarAPI = location.state?.usarAPI === true;

  const { dificuldade, materia, numQuestoes } = opcoes;

  const [respostas, setRespostas] = useState({});
  const [indiceQuestaoAtual, setIndiceQuestaoAtual] = useState(0);

  const [apiQuestoes, setApiQuestoes] = useState([]);
  const [apiLoading, setApiLoading] = useState(usarAPI); 
  const [apiError, setApiError] = useState('');

  // --- useEffect para carregar API ---
  useEffect(() => {
    if (!usarAPI) return; 

    const carregarQuestoesFastAPI = async () => {
      setApiLoading(true);
      setApiError('');
      try {
        const questoesDaApi = await apiPost(
          `/gerar-simulado/${id}`, // path
          opcoes,                 // body
          {                       // options
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );

        const questoesFormatadas = (questoesDaApi || []).map(q => ({
          ...q,
          opcoes: q.opcoes.map(opt => opt.texto)
        }));
        
        setApiQuestoes(questoesFormatadas);
        setIndiceQuestaoAtual(0);
        setRespostas({});

      } catch (e) {
        console.error("Erro na API:", e);
        
        // --- LÓGICA DO PLANO FREE vs PREMIUM ---
        const msg = e.message || '';
        // Verifica se é erro 403 ou fala sobre plano
        if (msg.includes('403') || msg.toLowerCase().includes('plano')) {
             setApiError("LIMITE_PLAN_FREE"); 
        } else {
             setApiError(msg || 'Erro ao buscar questões no FastAPI');
        }

      } finally {
        setApiLoading(false);
      }
    };

    carregarQuestoesFastAPI();
    
  }, [usarAPI, id, location.state, auth.token]); 
  

  // Origem das questões: API ou local 
  let questoesDoSimulado = [];
  if (usarAPI) {
    questoesDoSimulado = apiQuestoes;
  } else {
    // Fallback para dados locais
    console.warn("Usando fallback de dados locais (dadosSimulado.js)");
    const base = dadosSimulado[id] || [];
    const filtradas = base.filter((q) => {
      const okDif = dificuldade === 'todas' || q.dificuldade === dificuldade;
      const okMat = materia === '' || q.materia === materia; 
      return okDif && okMat;
    });
    questoesDoSimulado = embaralharArray(filtradas).slice(0, numQuestoes);
  }

  const perguntaAtual = questoesDoSimulado[indiceQuestaoAtual];

  // Handlers 
  const handleRespostaSelecionada = (indiceEscolhido) => {
    if (!perguntaAtual) return;
    setRespostas((prev) => ({ ...prev, [perguntaAtual.id]: indiceEscolhido }));
  };
  const handleProximaQuestao = () => {
    setIndiceQuestaoAtual((prev) => Math.min(prev + 1, questoesDoSimulado.length - 1));
  };
  const handleQuestaoAnterior = () => {
    setIndiceQuestaoAtual((prev) => Math.max(prev - 1, 0));
  };
  const progresso = questoesDoSimulado.length
    ? Math.round(((indiceQuestaoAtual + 1) / questoesDoSimulado.length) * 100)
    : 0;

  // --- Renderização de Loading ---
  if (usarAPI && apiLoading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
        <div className="mt-2">Gerando simulado com IA...</div>
      </Container>
    );
  }

  // --- Renderização de Erros ---
  if (usarAPI && apiError) {
    // TELA DE BLOQUEIO DO PLANO FREE
    if (apiError === "LIMITE_PLAN_FREE") {
        return (
            <Container className="py-5 text-center">
                <div className="p-5 border rounded shadow-sm bg-light">
                    <h2 className="text-warning mb-3">🚧 Limite do Plano Atingido</h2>
                    <p className="lead">
                        Você solicitou <strong>{numQuestoes} questões</strong>, mas seu plano <strong>{auth.user?.role?.toUpperCase()}</strong> permite apenas 5.
                    </p>
                    <hr className="my-4" />
                    <p>Para gerar simulados maiores e ilimitados, atualize para o <strong>Premium</strong>.</p>
                    
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Link to="/" className="btn btn-outline-secondary">
                            Tentar com 5 questões
                        </Link>
                        {/* --- LINK PARA A PÁGINA PREMIUM --- */}
                        <Link to="/premium" className="btn btn-success">
                            💎 Quero ser Premium
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }

    // ERRO GENÉRICO
    return (
      <Container className="py-4">
        <Alert variant="danger">Erro ao gerar simulado: {apiError}</Alert>
        <Link to={`/`} className="btn btn-secondary">
          Voltar
        </Link>
      </Container>
    );
  }

  if (!questoesDoSimulado.length && !apiLoading) { 
    return (
      <Container className="py-4">
        <Alert variant="warning">Nenhuma questão encontrada para os filtros selecionados.</Alert>
        <Link to={`/`} className="btn btn-secondary">
          Voltar
        </Link>
      </Container>
    );
  }

  // --- Renderização da Questão ---
  if (!perguntaAtual) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
        <div className="mt-2">Carregando...</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h4>Simulado — {(id || '').toUpperCase()}</h4>
          {/* Mostra o usuário logado */}
          <p className="text-muted small">
            Usuário: <strong>{auth.user?.username}</strong> <span className="badge bg-secondary">{auth.user?.role}</span>
          </p>
        </Col>
        <Col className="text-end">
          <span>{indiceQuestaoAtual + 1} / {questoesDoSimulado.length}</span>
          <ProgressBar now={progresso} className="mt-1" />
        </Col>
      </Row>

      <QuestaoCard
        pergunta={perguntaAtual}
        respostaUsuario={respostas[perguntaAtual.id]}
        onRespostaSelecionada={handleRespostaSelecionada}
      />

      <Row className="mt-3">
        <Col>
          <Button variant="secondary" onClick={handleQuestaoAnterior} disabled={indiceQuestaoAtual === 0}>
            Anterior
          </Button>
        </Col>
        <Col className="text-end">
          {indiceQuestaoAtual < questoesDoSimulado.length - 1 ? (
            <Button onClick={handleProximaQuestao}>Próxima</Button>
          ) : (
            <Button
              variant="success"
              as={Link}
              to="/resultado"
              state={{ respostas, questoes: questoesDoSimulado }}
            >
              Finalizar Simulado
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}