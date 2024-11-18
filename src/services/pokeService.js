import axios from "axios";

function GetAllPoke() {
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");


}

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
}