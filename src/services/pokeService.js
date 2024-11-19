import axios from "axios";

const itemsPerPage = 20; 

const GetAllPoke = (page = 1, limit = itemsPerPage) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`);
};

const GetPokemonByName = (name) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

const GetPokemonSpecies = (name) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
};


export default {
    GetAllPoke,
    GetPokemonByName,
    GetPokemonSpecies,
};
