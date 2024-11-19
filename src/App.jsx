import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PokemonDetails from './pages/PokemonDetails';
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
       
        <Nav className="ml-auto">
          <Nav.Link href="/homePage">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

        <Routes>

          <Route path='/HomePage' element={<Homepage />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
