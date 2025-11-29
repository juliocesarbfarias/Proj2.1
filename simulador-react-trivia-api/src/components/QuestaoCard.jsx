import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function QuestaoCard({ pergunta, onRespostaSelecionada, respostaUsuario }) {
  if (!pergunta) {
    return <p>Carregando questão...</p>;
  }

  return (
    <Card>
      <Card.Header as="h5">
        Vestibular: {pergunta.vestibular}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {pergunta.enunciado}
        </Card.Text>
        <ListGroup>
          {pergunta.opcoes.map((opcao, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => onRespostaSelecionada(index)}
              active={respostaUsuario === index}
              style={{ cursor: 'pointer' }}
            >
              {String.fromCharCode(65 + index)}) {opcao} {/* A) B) C) D) */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default QuestaoCard;