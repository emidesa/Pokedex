import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import PokemonDetails from './pages/PokemonDetails';
import './App.css';
import HomePage from './pages/homepage';
import PokeType from './pages/PokeType';


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>

          <Route path='/HomePage' element={<HomePage />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/pokemonType/:typeName" element={<PokeType />} />

        

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
