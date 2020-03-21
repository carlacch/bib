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
      <main className="App-main">
        <div className="row">
          <div className="column">
            <Restaurants/>
          </div>
          <div className="column">

          </div>
        </div>
      </main>
      <footer>
        <p> <b>Carla CAUCHE - Mars 2020</b> </p>
      </footer>
    </div>
  );
}

export default App;
