import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pokeService from "../services/pokeService";
import {
  Container,
  Spinner,
  Row,
  Col,
  ListGroup,
  Button,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await pokeService.GetPokemonSpecies(name);
        const responsebis = await pokeService.GetPokemonByName(name);

        const combinedData = {
          ...responsebis.data,
          ...response.data,
        };

        setPokemonDetails(combinedData);
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

  const flavorText = pokemonDetails.flavor_text_entries?.find(
    (entry) => entry.language.name === "fr"
  )?.flavor_text;
  const game_version = pokemonDetails.game_indices?.map(
    (game) => game.version.name
  );

  const types =
    pokemonDetails.types?.map((type) => type.type.name).join(", ") || "Unknown";
  const abilities =
    pokemonDetails.abilities
      ?.map((ability) => ability.ability.name)
      .join(", ") || "Unknown";
  const height = pokemonDetails.height / 10; //
  const weight = pokemonDetails.weight / 10;

  const stats = pokemonDetails.stats?.map((stat) => ({
    label: stat.stat.name,
    value: stat.base_stat,
  }));

  const chartData = {
    labels: stats?.map((stat) => stat.label),
    datasets: [
      {
        label: "Base Stats",
        data: stats?.map((stat) => stat.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weaknesses = pokemonDetails.types?.map((type) => type.type.name);
  const strengths = pokemonDetails.types?.map((type) => type.type.name);

  return (
    <Container>
      <Row className="my-4">
        <Col md={6} className="text-center">
          <img
            src={`https://img.pokemondb.net/artwork/${pokemonDetails.name}.jpg`}
            alt={pokemonDetails.name}
            style={{ width: "300px", height: "300px" }}
          />
          <h3 className="my-3">Base Stats</h3>
          <Bar data={chartData} options={{ responsive: true }} />
        </Col>

        <Col md={6}>
          <h1>{pokemonDetails.name}</h1>
          {flavorText && <p>Description: {flavorText}</p>}
          <h2> Game version</h2>
          <div>
            {game_version?.map((version, index) => {
              const variants = [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "light",
                "dark",
              ];

              const randomVariant =
                variants[Math.floor(Math.random() * variants.length)];

              return (
                <Button key={index} variant={randomVariant} className="m-1">
                  {version}
                </Button>
              );
            }) || <p>No game versions available</p>}
          </div>
          <h3>Details</h3>
          <ListGroup>
            <ListGroup.Item>Height: {height} meters</ListGroup.Item>
            <ListGroup.Item>Weight: {weight} kg</ListGroup.Item>
            <ListGroup.Item>Types: {types}</ListGroup.Item>
            <ListGroup.Item>Abilities: {abilities}</ListGroup.Item>
            <ListGroup.Item>
              Weaknesses: {weaknesses?.join(", ") || "Unknown"}
            </ListGroup.Item>
            <ListGroup.Item>
              Strengths: {strengths?.join(", ") || "Unknown"}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonDetails;
