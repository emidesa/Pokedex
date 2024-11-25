import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TypeService from "../services/TypeService";
import axios from 'axios';
import PokemonCards from "../components/PokemonCards";
import { Col, Container, Row } from "react-bootstrap";


const PokeType = () => {
  const { typeName } = useParams(); // Le nom du type passé en paramètre d'URL
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonsByType = async () => {
    try {
      const response = await TypeService.getAllType(); // Récupère tous les types
      const typeData = response.data.results.find((type) => type.name === typeName);

      if (!typeData) {
        console.error("Type non trouvé !");
        setLoading(false);
        return;
      }

      const typeResponse = await axios.get(typeData.url); // Requête pour les Pokémon de ce type
      setPokemons(typeResponse.data.pokemon.map((p) => p.pokemon)); // Récupère uniquement les Pokémon
    } catch (error) {
      console.error("Erreur lors de la récupération des Pokémon par type :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonsByType();
  }, [typeName]);

  if (loading) return <p>Chargement...</p>;

  return (

    <Container>
      <h1 className="text-center my-4">Pokémons de type : {typeName}</h1>

      <Row className="g-3"> 
        {pokemons.map((pokemon, index) => (
          <Col key={index}  sm={6} md={4} lg={3}> {/* Les colonnes ajustent la taille selon l'écran */}
            <PokemonCards pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </Container>

  );
};

export default PokeType;
