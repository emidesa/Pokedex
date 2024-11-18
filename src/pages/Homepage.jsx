import React, { useEffect, useState } from 'react';
import pokeService from '../services/pokeService';
import { Container, Pagination } from 'react-bootstrap';
import PokemonCards from '../components/PokemonCards';

const HomePage = () => {
   
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);


    const fetchPokemon = async () => {
        try {
            const response = await pokeService.GetAllPoke();
            console.log(response.data);
            setPokemon(response.data.results);
            setMaxPage(500);
            setTimeout(() => {
              window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "instant",
                });
          },50)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        fetchPokemon();
    }, []);



    return <>
     <Container>
            <h1 className="m-5">All Pokemon</h1>
            <div className="d-flex justify-content-center flex-wrap gap-5">
                {pokemon.map((pokemon2) => (
                    <PokemonCards 
                    pokemon={pokemon2} 
                    key={pokemon2.name} 
                    />
                ))}
            </div>
            <Pagination className="mt-5">
        {currentPage > 1 && 
        <>
        <Pagination.First onClick={() => {setCurrentPage(1)}} />
      <Pagination.Prev onClick={() => {setCurrentPage(currentPage - 1)}}/>
      <Pagination.Item onClick={() => {setCurrentPage(1)}}>{1}</Pagination.Item>
      </>}

      {currentPage - 5 > 0 && <>
      <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage - 5)}}/>
     </>}

     {(currentPage!= 2 && currentPage > 1) && <>
      <Pagination.Item onClick={() => {setCurrentPage(currentPage - 1)}}>{currentPage - 1}
      </Pagination.Item>
    </>}
    
      <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage +1 < maxPage && <>
            <Pagination.Item onClick={() => {setCurrentPage(currentPage+1)}}>{currentPage + 1}</Pagination.Item>
        </>}

            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage+5)}}/>
            </>}

      {currentPage < maxPage && <>
      <Pagination.Item onClick={() => {setCurrentPage(maxPage)}}>{maxPage}</Pagination.Item>
      <Pagination.Next onClick={() => {setCurrentPage(currentPage+1)}}/>
      <Pagination.Last onClick={() => {setCurrentPage(maxPage)}}/>
      </>}
     
    </Pagination>
        </Container>
    
    </>
    
}
export default HomePage;