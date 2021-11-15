import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import HeroesList from './HeroesList'
import HeroesItem from './HeroesItem'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='/item/:id' element={<HeroesItem />} />
            <Route path='/:page' element={<HeroesList />} />
            <Route path='/' element={<HeroesList />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
