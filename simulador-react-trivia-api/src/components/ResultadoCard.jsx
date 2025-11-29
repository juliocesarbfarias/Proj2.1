import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function ResultadoCard({ pergunta, respostaUsuario, numeroQuestao }) {
  const acertou = respostaUsuario === pergunta.respostaCorreta;

  const getVariant = (indexOpcao) => {
    if (indexOpcao === pergunta.respostaCorreta) {
      return 'success';
    }
    if (indexOpcao === respostaUsuario && !acertou) {
      return 'danger';
    }
    return '';
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h6" className={`text-white ${acertou ? 'bg-success' : 'bg-danger'}`}>
        Questão {numeroQuestao} - Você {acertou ? 'Acertou' : 'Errou'}!
      </Card.Header>    
      <Card.Body>
        <Card.Text style={{ fontWeight: 'bold' }}>
          {pergunta.enunciado}
        </Card.Text>
        <ListGroup>
          {pergunta.opcoes.map((opcao, index) => (
            <ListGroup.Item key={index} variant={getVariant(index)}>
              {String.fromCharCode(65 + index)}) {opcao}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ResultadoCard;