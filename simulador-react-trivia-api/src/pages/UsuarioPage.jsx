import React from 'react';
import { Container, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; 

export default function UsuarioPage() {
  const { user, logout } = useAuth();

  // Função simples para formatar a data de hoje (simulando "Última Sessão")
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'long', year: 'numeric'
  });
  const horaAtual = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});

  return (
    <Container className="py-5 d-flex justify-content-center">
        <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow-sm">
            <Card.Header className="bg-light h5 border-bottom-0 pt-3 pb-2">
                👤 Perfil do Usuário
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                        <strong>Usuário:</strong> 
                        <span>{user?.username}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                        <strong>Tipo de Conta:</strong> 
                        <span className={user?.role === 'premium' ? "text-success fw-bold" : "text-primary"}>
                            {user?.role === 'premium' ? '💎 Premium' : 'Free'}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                        <strong>Última Sessão:</strong> 
                        <span className="text-muted small">{dataAtual} às {horaAtual}</span>
                    </ListGroup.Item>
                </ListGroup>

                {/* BLOCO DE UPGRADE - Só aparece se NÃO for Premium */}
                {user?.role !== 'premium' && (
                    <Alert variant="info" className="text-center bg-info bg-opacity-10 border-info border-opacity-25">
                        <h5 className="alert-heading fs-6 fw-bold">⬆️ Faça um Upgrade!</h5>
                        <p className="small mb-3 text-secondary">
                            Gostando dos simulados? Usuários Premium têm acesso ilimitado e IA mais inteligente.
                        </p>
                        
                        {}
                        {/* Botão virou um LINK para /premium */}
                        <Link to="/premium" className="btn btn-success btn-sm px-4">
                            Quero ser Premium
                        </Link>
                    </Alert>
                )}
                
                {/* SE FOR PREMIUM, MOSTRA ISSO */}
                {user?.role === 'premium' && (
                     <Alert variant="success" className="text-center">
                        <h5 className="fs-6 fw-bold">💎 Você é Premium</h5>
                        <p className="small mb-0">Aproveite seus estudos sem limites!</p>
                    </Alert>
                )}

                <hr className="my-4"/>

                <Button variant="danger" className="w-100" onClick={logout}>
                    🕒 Sair (Logout)
                </Button>
            </Card.Body>
        </Card>
    </Container>
  );
}