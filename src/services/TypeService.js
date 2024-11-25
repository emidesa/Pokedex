import axios from "axios";

function getAllType() {
    return axios.get(" https://pokeapi.co/api/v2/type?limit=50")
}

export default {
    getAllType,
};