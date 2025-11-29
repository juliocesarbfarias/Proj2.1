import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/apiClient.js'; 
import { useAuth } from '../contexts/AuthContext.jsx'; 

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Estado do formulário fake
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  // --- CORREÇÃO AQUI: Pegamos o 'token' direto do contexto ---
  const { token } = useAuth(); 
  const navigate = useNavigate();

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Simula delay (processando...)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Chama o backend
      // --- CORREÇÃO: Usamos auth.token que é garantido ---
      const data = await apiPost('/upgrade', {}, {
        headers: { Authorization: `Bearer ${token}` } 
      });

      // 3. Sucesso!
      if (data.access_token) {
        // Salva o novo token (que tem poderes Premium)
        localStorage.setItem('site_simulados_token', data.access_token);
        // Atualiza a página inteira para o sistema perceber a mudança
        setSuccess(true);
        setTimeout(() => {
           window.location.href = "/"; 
        }, 2000);
      }

    } catch (err) {
      console.error(err);
      // Mostra o erro real se houver
      const msg = err.message || "Erro desconhecido";
      if (msg.includes("404")) {
          setError("Erro: O Backend não encontrou a rota /upgrade. Reinicie o servidor Python!");
      } else {
          setError(`Falha ao assinar: ${msg}`);
      }
      setLoading(false);
    }
  };

  if (success) {
    return (
        <Container className="py-5 text-center">
            <div className="p-5 bg-success text-white rounded shadow">
                <h1 className="display-4">🎉 Parabéns!</h1>
                <p className="lead">Pagamento aprovado. Você agora é <strong>PREMIUM</strong>.</p>
                <Spinner animation="border" variant="light" size="sm" /> Atualizando seu perfil...
            </div>
        </Container>
    )
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Escolha o Melhor para Seus Estudos</h2>
      
      <Row className="justify-content-center">
        {/* CARD FREE */}
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center border-0 shadow-sm" style={{opacity: 0.7}}>
            <Card.Header className="bg-light py-3">PLANO GRÁTIS</Card.Header>
            <Card.Body>
              <h3 className="my-3">R$ 0,00</h3>
              <ul className="list-unstyled text-start mt-4 px-3">
                <li className="mb-2">✅ Acesso aos simulados</li>
                <li className="mb-2">⚠️ Limite de 5 questões</li>
                <li className="mb-2 text-muted">❌ Sem suporte prioritário</li>
              </ul>
            </Card.Body>
            <Card.Footer className="bg-white">
                <Button variant="outline-secondary" disabled>Seu Plano Atual</Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* CARD PREMIUM */}
        <Col md={5} className="mb-4">
          <Card className="h-100 border-primary shadow" style={{transform: 'scale(1.05)', zIndex: 10}}>
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="m-0">💎 PREMIUM</h5>
            </Card.Header>
            <Card.Body>
              <h3 className="my-3 text-primary">R$ 19,90 <small className="text-muted fs-6">/mês</small></h3>
              <ul className="list-unstyled text-start mt-4 px-3">
                <li className="mb-2">✅ <strong>Questões ILIMITADAS</strong></li>
                <li className="mb-2">✅ Gere simulados gigantes</li>
                <li className="mb-2">✅ Histórico Completo</li>
                <li className="mb-2">✅ IA de Geração Otimizada</li>
              </ul>

              <hr />
              
              <Form onSubmit={handleUpgrade} className="text-start mt-4">
                <h6 className="mb-3 text-muted">Dados do Pagamento (Simulado)</h6>
                <Form.Group className="mb-3">
                    <Form.Label>Nome no Cartão</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ex: Seu Nome" 
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Número do Cartão</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

                <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100 mt-2" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'PROCESSANDO...' : 'ASSINAR AGORA'}
                </Button>
                <p className="text-center mt-2 text-muted" style={{fontSize: '0.8rem'}}>
                    * Ambiente de teste. Nenhuma cobrança real será feita.
                </p>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}