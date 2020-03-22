import React from 'react';
import star from './star.svg';
import './App.css';
import Restaurants from './components/Restaurants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BibRestaurateur</h1>
        <h3>Vous trouverez ici les restaurants Maître restaurateur avec la distinction BibGourmand <img src={star} className="App-logo" alt="star" /></h3>
      </header>
      <div className="App-main">
          <div className="column list">
            <Restaurants/>
          </div>
          <div className="column map">

          </div>
      </div>
      <footer>
        <p> <b>Carla CAUCHE - Mars 2020</b> </p>
      </footer>
    </div>
  );
}

export default App;
