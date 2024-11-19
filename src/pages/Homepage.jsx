import React, { useEffect, useState } from 'react';
import pokeService from '../services/pokeService';
import { Button, Container, Pagination, Form } from 'react-bootstrap';
import PokemonCards from '../components/PokemonCards';

const HomePage = () => {
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const itemsPerPage = 20;

    const fetchPokemon = async () => {
        try {
            const response = await pokeService.GetAllPoke(currentPage, itemsPerPage);
            const allPokemon = response.data.results;

            if (searchValue) {
                const filteredPokemon = allPokemon.filter((p) =>
                    p.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                setPokemon(filteredPokemon);
                setMaxPage(Math.ceil(filteredPokemon.length / itemsPerPage));
            } else {
                setPokemon(allPokemon);
                setMaxPage(Math.ceil(response.data.count / itemsPerPage));
            }
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };


    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); 
    };

  
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

   
    useEffect(() => {
        fetchPokemon();
    }, [currentPage, searchValue]);

    return (
        <Container>
            <h1 className="m-5">All Pokémon</h1>

            <Form onSubmit={handleSearch}>
                <Form.Label htmlFor="search">Search for a Pokémon</Form.Label>
                <Form.Control
                    type="text"
                    id="search"
                    placeholder="e.g., Bulbasaur"
                    className="mb-3"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="primary" className="col-12 mb-3" type="submit">
                    Search
                </Button>
            </Form>

            <div className="d-flex justify-content-center flex-wrap gap-5">
                {pokemon.map((poke) => (
                    <PokemonCards
                        pokemon={poke}
                        key={poke.name}
                    />
                ))}
            </div>

            <Pagination className="mt-5">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

               
                {Array.from({ length: Math.min(5, maxPage) }, (_, i) => {
                    const pageNumber = currentPage - 2 + i;
                    return (
                        pageNumber > 0 && pageNumber <= maxPage && (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        )
                    );
                })}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === maxPage} />
                <Pagination.Last onClick={() => handlePageChange(maxPage)} disabled={currentPage === maxPage} />
            </Pagination>
        </Container>
    );
};

export default HomePage;







