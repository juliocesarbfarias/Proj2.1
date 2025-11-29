import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Button, ProgressBar, Alert } from 'react-bootstrap';
import ResultadoCard from '../components/ResultadoCard';

function ResultadoPage() {
  const location = useLocation();
  
  if (!location.state) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          Nenhum resultado para exibir.
        </Alert>
        <p>Você precisa finalizar um simulado para ver seus resultados.</p>
        <Button as={Link} to="/">Voltar para o Início</Button>
      </Container>
    );
  }

  const { respostas, questoes } = location.state;
  const idSimulado = questoes[0]?.vestibular.toLowerCase();

  const acertos = questoes.reduce((total, questao) => {
    if (respostas[questao.id] === questao.respostaCorreta) {
      return total + 1;
    }
    return total;
  }, 0);

  const totalQuestoes = questoes.length;
  const percentualAcertos = (acertos / totalQuestoes) * 100;

  return (
    <Container className="mt-4">
      <h1 className="text-center">Resultado do Simulado</h1>
      <p className="lead text-center">
        {questoes[0]?.vestibular}
      </p>

      <div className="p-4 mb-4 bg-light rounded-3 text-center">
        <h2>Seu Desempenho</h2>
        <h3>Você acertou {acertos} de {totalQuestoes} questões!</h3>
        <ProgressBar 
          now={percentualAcertos} 
          label={`${Math.round(percentualAcertos)}%`} 
          variant={percentualAcertos > 60 ? 'success' : 'warning'} 
        />
      </div>

      <div className="d-flex justify-content-center gap-2 mb-4">
        <Button as={Link} to={`/simulado/${idSimulado}`} variant="primary">
          Tentar Novamente
        </Button>
        <Button as={Link} to="/" variant="secondary">
          Ver Outros Simulados
        </Button>
      </div>

      <hr />

      <h2 className="mt-4">Gabarito Detalhado</h2>
      {questoes.map((pergunta, index) => (
        <ResultadoCard
          key={pergunta.id}
          numeroQuestao={index + 1}
          pergunta={pergunta}
          respostaUsuario={respostas[pergunta.id]}
        />
      ))}
    </Container>
  );
}

export default ResultadoPage;