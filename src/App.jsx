import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Navbar  from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path='/HomePage' element={<Homepage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
