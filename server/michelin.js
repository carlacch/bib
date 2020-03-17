const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

//const URL = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/';

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  var experience = $('#experience-section > ul > li:nth-child(2)').text();
  experience = experience.replace('ò\n','').trim();
  return {name, experience};
};

const parseInfo = data =>{
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  var list = $('.section-main li.restaurant-details__heading-price').text().trim().split('\n');
  let type = list.pop().replace('•','').trim();
  let price ="";
  list.forEach(e => {
    price+=e.trim();
  })
  var experience = $('#experience-section > ul > li:nth-child(2)').text();
  experience = experience.replace('ò\n','').replace('ó','').replace('ô','').trim();
  var adress = $('.section-main ul.restaurant-details__heading--list li:nth-child(1)');
  //console.log(adress.attr('class'));
  if (adress.hasClass('restaurant-details__heading-experience-title')){
    adress = adress.next('li');
    //console.log('next');
    //console.log(adress);
  }
  adress = adress.text().trim();
  const tel = $('.section-main .collapse__block-item .d-flex span.flex-fill').first().text();
  const link = $('.section-main .link-item .d-flex span.flex-fill').text();
  return {name, adress, price, type, experience,  tel, link};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapeOneRestaurant = async url => {
  const resp = await axios(url);
  if (resp.status >= 200 && resp.status < 300){
    return parseInfo(resp.data);  
  }
  console.error(status);
  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async (url) => {
  const resp = await axios(url);
  if (resp.status >= 200 && resp.status < 300){
    const $ = cheerio.load(resp.data);
    var links =[];
    var restaurants=[];

    $('div.col-md-6.col-lg-6.col-xl-3').each(function(i, element){
      var link = 'https://guide.michelin.com'+$(element).find('a.link').attr('href');
      links.push(link);
    });

    for(let link of links){
      let restaurant = await this.scrapeOneRestaurant(link);
      restaurants.push(restaurant);
      fs.appendFileSync('restaurant_michelin.json', toJSON(restaurant));
      fs.appendFileSync('restaurant_michelin.json', ",");
    }

    return restaurants;  
  }
  console.error(status);
  return null;
};

const toJSON = (restaurant) => {
  return JSON.stringify(restaurant,null, 2)
}

module.exports.test = async () => {
  let test = await this.scrapeOneRestaurant(URL);
  console.log(test);
}
