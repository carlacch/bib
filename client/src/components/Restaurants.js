import React, { Component } from 'react';
import './Restaurants.css';
import BibRest from '../restaurant_bib.json';

class Restaurants extends Component {
  render(){
    return(
      <div className="list_restaurant"> <h4>RESTAURANTS :</h4> <br/>
        {BibRest.map((restau) => {
          return <Restaurant key={restau.id} element={restau}/>})}
      </div>
    );
  }
};


function Restaurant({element}){
  let value = "//" + element.link;
  return(
    
      <div className="card">
          <p className="name"><b>{element.name}</b></p>
          <p>{element.adress}</p>
          <p>{element.tel}</p>
          <p>{element.price}</p>
          <a className="link" target="_blank" rel="noopener noreferrer" href={value}>{element.link}</a>
      </div>
  );
}

export default Restaurants;