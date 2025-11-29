// src/pages/ApiDemoPage.jsx
import React from "react";
import { Card, Container, Row, Col, Spinner, Alert, ListGroup } from "react-bootstrap";
import { useUsers } from "../hooks/useUsers";

export default function ApiDemoPage() {
  const { data, loading, error } = useUsers();

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Header as="h5">Exemplo de Integração com API</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Base URL configurada via <code>.env</code> ({import.meta.env.VITE_API_BASE_URL || "não configurada"})
              </p>
              {loading && (
                <div className="d-flex align-items-center gap-2">
                  <Spinner animation="border" role="status" size="sm" />
                  <span>Carregando dados...</span>
                </div>
              )}
              {error && <Alert variant="danger">Erro: {error}</Alert>}
              {!loading && !error && (
                <ListGroup>
                  {data.map((u) => (
                    <ListGroup.Item key={u.id}>
                      <strong>{u.name}</strong> — <small>{u.email}</small>
                      <div className="text-muted">{u.website}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
