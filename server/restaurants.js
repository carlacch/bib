const michelin = require('./michelin');
const maitre = require('./maitre')
const fs = require('fs');
const URL = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/';

async function michelinRestaurants(){
  let i=1;
  let restaurants;
  let all_rest=[];
  
  do {
    console.log(i);
    restaurants = await michelin.get(URL+i);
    all_rest = all_rest.concat(restaurants);
    i++;
  }
  while(restaurants.length!=0);

  fs.writeFileSync('restaurant_michelin.json', JSON.stringify(all_rest,null,2));
  console.log('done');
  return all_rest;
}

async function maitreRestaurants(){
  let page = 1;
  let all_restaurants=[];
  let restaurants 
  do {
    console.log(page);
    restaurants = await maitre.scrapeRestaurants(page);
    all_restaurants = all_restaurants.concat(restaurants)
    page++;
  }
  while(restaurants.length!=0);  
  
  fs.writeFileSync('restaurant_maitre.json', JSON.stringify(all_restaurants,null,2));
  console.log(`Number of restaurants : ${all_restaurants.length}`);
  return all_restaurants;  
}

const mich_rest = michelinRestaurants();
const maitre_rest = maitreRestaurants();
//maitre.test1();