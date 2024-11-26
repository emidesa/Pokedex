import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import PokemonCards from '../components/PokemonCards';  

const HabitatPage = () => {
  const { habitatName } = useParams();  
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitatDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${habitatName}`);
        setPokemonList(response.data.pokemon_species);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch habitat details.");
        setLoading(false);
      }
    };

    fetchHabitatDetails();
  }, [habitatName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Habitat: {habitatName}</h1>
      <Row>
        {pokemonList.map((pokemon, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <PokemonCards pokemon={pokemon} />  
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HabitatPage;
