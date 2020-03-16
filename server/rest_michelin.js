const michelin = require('./michelin');

async function michelinRestaurant(){
  var restaurants = await michelin.get();
  //console.log(michelin.get());

  console.log(restaurants);


  /*
  restaurants.forEach(restaurant => {
    console.log(restaurant.name);
  })*/
}

michelinRestaurant();
