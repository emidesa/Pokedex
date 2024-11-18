import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pokeService from '../services/pokeService';
import { Container, Spinner } from 'react-bootstrap';

const PokemonDetails = () => {
  const { name } = useParams(); 
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {

        const response = await pokeService.GetPokemonSpecies(name); 
        setPokemonDetails(response.data);
        const responsebis = await pokeService.GetPokemonByName(name)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]); 

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const flavorText = pokemonDetails.flavor_text_entries?.find(entry => entry.language.name === 'fr')?.flavor_text;


  return (
    <Container>
      <h1>{pokemonDetails.name}</h1>
      <img
        src={`https://img.pokemondb.net/artwork/${pokemonDetails.name}.jpg`}
        alt={pokemonDetails.name}
        style={{ width: '300px', height: '300px' }}
      />

    {flavorText && <p>Description: {flavorText}</p>}
      <p>Habitat: {pokemonDetails.habitat ? pokemonDetails.habitat.name : 'Unknown'}</p>
      <p>Color: {pokemonDetails.color.name}</p>
      <p>Generation: {pokemonDetails.generation.name}</p>
      <p>Growth rate: {pokemonDetails.growth_rate.name}</p>
      <p>Shape: {pokemonDetails.shape.name}</p>
    </Container>
  );
};

export default PokemonDetails;

