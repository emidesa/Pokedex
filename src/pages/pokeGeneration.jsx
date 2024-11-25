import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PokemonCards from "../components/PokemonCards";
import { Row, Col, Container } from "react-bootstrap";

const PokeGeneration = () => {
  const { generationId } = useParams(); 
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonsByGeneration = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generationId}`);
      setPokemons(response.data.pokemon_species); 
    } catch (error) {
      console.error("Erreur lors de la récupération des Pokémon par génération :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonsByGeneration();
  }, [generationId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <Container>
      <h1 className="text-center my-4">Pokémons de la génération : {generationId}</h1>

      <Row className="g-4">
        {pokemons.map((pokemon, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
         
            <PokemonCards pokemon={{ name: pokemon.name }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PokeGeneration;
