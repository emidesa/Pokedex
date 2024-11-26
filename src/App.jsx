import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import PokemonDetails from './pages/PokemonDetails';
import './App.css';
import HomePage from './pages/homepage';
import PokeType from './pages/PokeType';
import PokeGeneration from './pages/pokeGeneration';
import VersionGroupPage from './pages/versionGroupPage';
import HabitatPage from './pages/HabitatPage';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/pokemonType/:typeName" element={<PokeType />} />
        <Route path="/generation/:generationId" element={<PokeGeneration />} />
        <Route path="/version-group/:versionGroupId" element={<VersionGroupPage />} />
        <Route path="/pokemonHabitat/:habitatName" element={<HabitatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

