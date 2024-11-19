import axios from "axios";

const itemsPerPage = 20; 

const GetAllPoke = (page = 1, limit = itemsPerPage) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`);
};

const GetPokemonByName = (name, page = 1, limit = itemsPerPage) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}?offset=${(page - 1) * limit}&limit=${limit}`);
};

const GetPokemonSpecies = (name, page = 1, limit = itemsPerPage) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}?offset=${(page - 1) * limit}&limit=${limit}`);
};

export default {
    GetAllPoke,
    GetPokemonByName,
    GetPokemonSpecies,
};
