import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Importa nosso hook
import { useAuth } from '../contexts/AuthContext'; // Importa o hook de usuário

function ConfigPage() {
  // 1. Pega os contextos
  const { theme, setTheme } = useTheme();
  const { user } = useAuth(); // Pega o usuário logado

  // 2. Controla os campos do formulário com o State
  // (Preenche o nome do usuário se ele estiver logado)
  const [nome, setNome] = useState(user?.username || 'Seu nome');
  const [notificacoes, setNotificacoes] = useState(false);
  const [salvo, setSalvo] = useState(false);

  // 3. O dropdown agora vai atualizar o tema instantaneamente
  const handleThemeChange = (e) => {
    setTheme(e.target.value); // 'light' ou 'dark'
  };

  // 4. O botão "Salvar" (por enquanto, só exibe uma mensagem)
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    // Aqui você salvaria o 'nome' e 'notificacoes' no futuro
    console.log('Salvando:', { nome, notificacoes });
    setSalvo(true);
    // Esconde a mensagem após 3 segundos
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '700px' }}>
      <h1>Configurações</h1>
      <p>Ajuste as preferências do simulador.</p>
      <hr />

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNomeUsuario">
          <Form.Label>Nome de Usuário</Form.Label>
          <Form.Control 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTema">
          <Form.Label>Tema</Form.Label>
          <Form.Select 
            value={theme} // O valor é controlado pelo nosso Contexto
            onChange={handleThemeChange} // A mudança é instantânea
          >
            {/* Os 'value' são importantes! */}
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotificacoes">
          <Form.Check 
            type="switch" 
            label="Habilitar notificações por e-mail" 
            checked={notificacoes}
            onChange={(e) => setNotificacoes(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar Alterações
        </Button>

        {salvo && (
          <Alert variant="success" className="mt-3">
            Preferências salvas com sucesso!
          </Alert>
        )}
      </Form>
    </Container>
  );
}
export default ConfigPage;