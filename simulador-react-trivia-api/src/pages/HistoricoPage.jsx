// src/pages/HistoricoPage.jsx
import React, { useEffect, useState } from 'react';
// --- CORREÇÃO AQUI EMBAIXO ---
// Mudamos de '../services/api' para '../services/apiClient'
// E importamos a função específica { apiGetInternal }
import { apiGetInternal } from '../services/apiClient'; 
import { Container, Table, Alert, Spinner } from 'react-bootstrap';

function HistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      // --- CORREÇÃO AQUI TAMBÉM ---
      // Usamos a função do seu cliente novo que conecta no Python
      const data = await apiGetInternal('/historico');
      
      // O apiGetInternal já retorna os dados prontos (o JSON), 
      // então não precisa fazer "response.data"
      setHistorico(data);
      
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar histórico.');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return '-';
    // O 'Z' força o navegador a entender que é UTC e converter para seu horário local
    const data = new Date(dataString + 'Z'); 
    return data.toLocaleString('pt-BR'); 
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Meus Simulados Anteriores</h2>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && historico.length === 0 && (
        <Alert variant="info">Você ainda não realizou nenhum simulado.</Alert>
      )}

      {!loading && !error && historico.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Vestibular</th>
              <th>Matéria</th>
              <th>Dificuldade</th>
              <th>Qtd.</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((simulado) => (
              <tr key={simulado.id}>
                <td>{simulado.id}</td>
                <td>{formatarData(simulado.data_criacao)}</td>
                <td>
                    <span className="badge bg-primary">
                        {simulado.vestibular ? simulado.vestibular.toUpperCase() : '-'}
                    </span>
                </td>
                <td>{simulado.materia}</td>
                <td>
                    <span className={`badge ${
                        simulado.dificuldade === 'facil' ? 'bg-success' : 
                        simulado.dificuldade === 'medio' ? 'bg-warning text-dark' : 
                        'bg-danger'
                    }`}>
                        {simulado.dificuldade}
                    </span>
                </td>
                <td>{simulado.num_questoes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default HistoricoPage;