// src/pages/SimuladoApiPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, ProgressBar } from "react-bootstrap";
import { useQuestions } from "../hooks/useQuestions";

export default function SimuladoApiPage() {
  const { id = "UNICAMP" } = useParams();
  const { data, loading, error } = useQuestions({ prova: id, qtd: 10 });
  const [selecionadas, setSelecionadas] = useState({}); // {idx: iResposta}

  if (loading) return <div className="p-4"><Spinner animation="border" /></div>;
  if (error)   return <div className="p-4"><Alert variant="danger">{error}</Alert></div>;

  const respondidas = Object.keys(selecionadas).length;
  const total = data.length;
  const acertos = data.reduce((acc, q, i) => acc + (selecionadas[i] === q.correctIndex ? 1 : 0), 0);

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h3>Simulado (API) — {id}</h3>
          <div className="d-flex align-items-center gap-3">
            <Badge bg="secondary">Questões: {total}</Badge>
            <Badge bg="info">Respondidas: {respondidas}</Badge>
            <Badge bg="success">Acertos: {acertos}</Badge>
          </div>
          <ProgressBar now={(respondidas/Math.max(total,1))*100} className="mt-2" />
          <div className="text-muted small mt-2">
            Base: <code>{import.meta.env.VITE_API_BASE_URL || "fallback (the-trivia-api.com/v2)"}</code>
          </div>
        </Col>
      </Row>

      {data.map((q, idx) => (
        <Card key={q.id || idx} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <strong>{idx+1}. {q.question}</strong>
              <Badge bg="light" text="dark">{q.difficulty} — {q.category}</Badge>
            </div>
            <div className="mt-3 d-flex flex-column gap-2">
              {q.answers.map((alt, i) => {
                const selecionada = selecionadas[idx] === i;
                const terminou = selecionadas[idx] !== undefined;
                // feedback simples: pinta correta/incorreta após selecionar
                let variant = "outline-primary";
                if (terminou) {
                  if (i === q.correctIndex) variant = "success";
                  else if (selecionada) variant = "danger";
                }
                return (
                  <Button
                    key={i}
                    variant={variant}
                    onClick={() => setSelecionadas(s => ({...s, [idx]: i}))}
                  >
                    {String.fromCharCode(65+i)}) {alt}
                  </Button>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
