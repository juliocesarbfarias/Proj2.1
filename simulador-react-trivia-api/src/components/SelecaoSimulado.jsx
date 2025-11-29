// src/components/SelecaoSimulado.jsx

import React, { useState } from 'react'; // <-- MUDANÇA: useMemo não é mais necessário
import { Form, Button, Card, Alert } from 'react-bootstrap';

// <-- MUDANÇA: Lista fixa de matérias
const listaDeMaterias = [
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'Geografia',
  'História',
  'Filosofia',
  'Sociologia',
  'Português'
];

// <-- MUDANÇA: Propriedades removidas, só precisamos de 'onIniciar'
function SelecaoSimulado({ onIniciar }) { 
  const [dificuldade, setDificuldade] = useState('');
  
  // <-- MUDANÇA: De 'materiasSelecionadas = []' para 'materiaSelecionada = ""' (de array para string)
  const [materiaSelecionada, setMateriaSelecionada] = useState('');
  
  // <-- MUDANÇA: Valor padrão '5' para a quantidade
  const [numQuestoes, setNumQuestoes] = useState(5); 

  // <-- MUDANÇA: Lógica de 'maxQuestoesDisponiveis' removida, não precisamos mais dela
  // const maxQuestoesDisponiveis = useMemo(...)

  // <-- MUDANÇA: 'handleMateriaChange' removido, não é mais necessário

  const handleIniciarClick = () => {
    onIniciar({
      dificuldade: dificuldade || 'todas',
      // <-- MUDANÇA: Enviando 'materia' (string) em vez de 'materias' (array)
      materia: materiaSelecionada, 
      numQuestoes,
    });
  };

  // <-- MUDANÇA: Lógica do botão atualizada para a string 'materiaSelecionada'
  const isButtonDisabled = dificuldade === '' || materiaSelecionada === '';

  return (
    <Card>
      <Card.Body>
        <Card.Title>Personalize seu Simulado</Card.Title>
        
        {/* <-- MUDANÇA: Alerta atualizado para 'materiaSelecionada' */}
        {(dificuldade === '' || materiaSelecionada === '') && (
            <Alert variant="info">
                Por favor, selecione a dificuldade e a matéria para começar.
            </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nível de Dificuldade</Form.Label>
            <Form.Select value={dificuldade} onChange={(e) => setDificuldade(e.target.value)}>
              <option value="" disabled>-- Selecione uma dificuldade --</option>
              <option value="todas">Todas as Dificuldades</option>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </Form.Select>
          </Form.Group>

          {/* --- MUDANÇA PRINCIPAL AQUI (Matérias) --- */}
          <Form.Group className="mb-3">
            <Form.Label>Matéria</Form.Label>
            {/* Trocamos 'Form.Check' por 'Form.Select' */}
            <Form.Select 
              value={materiaSelecionada} 
              onChange={(e) => setMateriaSelecionada(e.target.value)}
            >
              <option value="" disabled>-- Selecione uma matéria --</option>
              {/* Fazemos um loop na nossa lista de matérias fixas */}
              {listaDeMaterias.map((materia) => (
                <option key={materia} value={materia}>
                  {materia}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* --- FIM DA MUDANÇA --- */}


          {/* --- MUDANÇA PRINCIPAL AQUI (Quantidade) --- */}
          <Form.Group className="mb-3">
            <Form.Label>Quantidade de Questões</Form.Label>
            <Form.Select 
              value={numQuestoes} 
              onChange={(e) => setNumQuestoes(Number(e.target.value))}
              // <-- MUDANÇA: 'disabled' removido
            >
              {/* Geramos opções de 0 a 10 dinamicamente */}
              {[...Array(11).keys()].map(n => (
                  <option key={n} value={n}>{n} Questões</option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* --- FIM DA MUDANÇA --- */}

        </Form>
        <Button
          variant="primary"
          onClick={handleIniciarClick}
          disabled={isButtonDisabled} 
        >
          Iniciar Simulado
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SelecaoSimulado;