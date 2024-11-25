import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';  
import { useNavigate } from 'react-router-dom';
import TypeService from "../services/TypeService";
import { Link } from 'react-router-dom';



const NavbarComponent = () => {

  const [types, setTypes] = useState ([]);
  const navigate = useNavigate();

  const fetchTypes = async () => {
    try {

    const response= await TypeService.getAllType();
    setTypes(response.data.results)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  return (

    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
     
      <Nav className="ml-auto">
        <Nav.Link href="/homePage">Home</Nav.Link>
       

        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Types
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {types.map((type, index) => (
                <Dropdown.Item 
                  key={index} 
                  as={Link} 
                  to={`/pokemonType/${type.name}`}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default NavbarComponent; 

