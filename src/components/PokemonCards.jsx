import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PokemonCards = ({ pokemon }) => {
  const navigate = useNavigate();

  const navigateTo = (name) => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <Card style={{ width: '15rem' }} onClick={() => navigateTo(pokemon.name)}>
      <Card.Img
        variant="top"
        src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
        alt={pokemon.name}
        className='pokemon-image'
      />
      <Card.Body>
        <Card.Title className="d-flex align-items-center flex-column">
          {pokemon.name}
        </Card.Title>
        <Button className="d-flex justify-content-center flex-column" variant="warning">
          Voir détails
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonCards;
