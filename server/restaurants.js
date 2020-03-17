const michelin = require('./michelin');
const maitre = require('./maitre')
const fs = require('fs');
const URL = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/';

async function michelinRestaurants(){
  let i=1;
  var restaurants;
  var all_rest=[];

  fs.writeFileSync('restaurant_michelin.json', "[");
  do {
    console.log(i);
    restaurants = await michelin.get(URL+i);
    all_rest = all_rest.concat(restaurants);
    i++;
  }
  while(restaurants.length!=0);
  fs.appendFileSync('restaurant_michelin.json', "]");

  console.log('done');
  return all_rest;
}

async function maitreRestaurants(){
  const restaurants = await maitre.get();
  fs.writeFileSync('restaurant_michelin.json', restaurants);
  console.log('done');
  return all_rest;
}

//michelinRestaurants();
//michelin.test();