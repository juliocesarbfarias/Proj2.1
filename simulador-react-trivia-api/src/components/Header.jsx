import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { PersonCircle, GearFill, ClockHistory } from 'react-bootstrap-icons'; // (Opcional) Adicionei ClockHistory se quiser ícone
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Meu App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            {/* --- 1. O NOVO BOTÃO DE HISTÓRICO --- */}
            {/* Só aparece se estiver logado */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/historico" className="d-flex align-items-center me-2">
                 {/* Se quiser um ícone de relógio, use <ClockHistory className="me-1" /> */}
                 Meus Simulados
              </Nav.Link>
            )}
            {/* ------------------------------------ */}

            {isAuthenticated ? (
              <Nav.Link as={Link} to="/usuario" className="d-flex align-items-center">
                 <PersonCircle className="me-2" />
                 <span>Usuário</span>
               </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                 <PersonCircle className="me-2" />
                 <span>Login</span>
               </Nav.Link>
            )}
            
            <Nav.Link as={Link} to="/api-demo">
              API Demo
            </Nav.Link>
            
            <Nav.Link as={Link} to="/configuracoes">
              <GearFill />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;