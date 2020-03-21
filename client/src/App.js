import React from 'react';
import star from './star.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BibRestaurateur</h1>
        <h3>Vous trouverez ici les restaurants Maître restaurateur avec la distinction BibGourmand <img src={star} className="App-logo" alt="star" /></h3>
      </header>
      <p>Voici le site ...</p>
    </div>
  );
}

export default App;
