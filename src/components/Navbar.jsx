import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';  
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import TypeService from "../services/TypeService";

const NavbarComponent = () => {
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [versions, setVersions] = useState([]);
  const navigate = useNavigate();

  const fetchTypes = async () => {
    try {
      const response = await TypeService.getAllType();
      setTypes(response.data.results);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const fetchGenerations = async () => {
    try {
      const response = await TypeService.getAllGeneration();
      setGenerations(response.data.results);
    } catch (error) {
      console.error("Error fetching generations:", error);
    }
  };

  const fetchVersions = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/version-group/");
      setVersions(response.data.results);
    } catch (error) {
      console.error("Error fetching versions:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchGenerations();
    fetchVersions();
  }, []);

  const handleSelectGeneration = (url) => {
    const generationId = url.split("/").filter(Boolean).pop();
    navigate(`/generation/${generationId}`);
  };

  const handleSelectVersion = (versionUrl) => {
    const versionId = versionUrl.split("/").filter(Boolean).pop();
    navigate(`/version-group/${versionId}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/homePage">Home</Nav.Link>
          
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-types">
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

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-generations">
              Générations
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {generations.map((generation, index) => (
                <Dropdown.Item key={index} onClick={() => handleSelectGeneration(generation.url)}>
                  {`Génération ${index + 1}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-versions">
              Versions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {versions.map((version, index) => (
                <Dropdown.Item 
                  key={index} 
                  onClick={() => handleSelectVersion(version.url)}
                >
                  {version.name}
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

