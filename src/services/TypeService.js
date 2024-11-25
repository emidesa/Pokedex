import axios from "axios";

function getAllType() {
    return axios.get(" https://pokeapi.co/api/v2/type?limit=50")
}

function getAllGeneration(id) {
    return axios.get(`https://pokeapi.co/api/v2/generation`)
}

export default {
    getAllType,
    getAllGeneration,
};