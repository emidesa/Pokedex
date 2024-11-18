import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';  

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
       
        <Nav className="ml-auto">
          <Nav.Link href="/homePage">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent; 

