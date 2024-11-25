import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCards from "../components/PokemonCards";
import { Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";

const VersionGroupPage = () => {
  const { versionGroupId } = useParams();
  const [pokemons, setPokemons] = useState([]);
  const [versionGroupName, setVersionGroupName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemonsByVersionGroup = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/version-group/${versionGroupId}/`);
      setVersionGroupName(response.data.name);

      const generationResponse = await axios.get(response.data.generation.url);
      const pokemonUrls = generationResponse.data.pokemon_species || [];

      const pokemonsData = await Promise.all(
        pokemonUrls.map((url) => axios.get(url.url))
      );

      setPokemons(pokemonsData.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching Pokémon for this version group:", error);
      setError("An error occurred while fetching Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (versionGroupId) {
      fetchPokemonsByVersionGroup();
    } else {
      setError("Invalid version group ID.");
      setLoading(false);
    }
  }, [versionGroupId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokémon from {versionGroupName}</h1>
      {pokemons.length === 0 ? (
        <p className="text-center">No Pokémon found for this version group.</p>
      ) : (
        <Row className="justify-content-center">
          {pokemons.map((pokemon, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <PokemonCards pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VersionGroupPage;

