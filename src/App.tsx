import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Details from './Pages/Details';
import Variable from './Pages/Variables';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/variable/:variable/:idx/:id" element={<Variable />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
