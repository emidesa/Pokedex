import axios from "axios";

function GetAllPoke() {
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");


}

export default { 
    GetAllPoke,
}