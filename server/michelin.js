const axios = require('axios');
const cheerio = require('cheerio');

//const URL = 'https://guide.michelin.com/fr/fr/restaurants'
const URL = 'https://guide.michelin.com/fr/fr/ile-de-france/la-garenne-colombes/restaurant/le-saint-joseph';

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
  let type ="";
  list.forEach(e => {
    type+=e.trim();
  })
  var experience = $('#experience-section > ul > li:nth-child(2)').text();
  experience = experience.replace('ò\n','').trim();
  const adress = $('.section-main ul.restaurant-details__heading--list li:nth-child(1)').text();
  const tel = $('.section-main .collapse__block-item .d-flex span.flex-fill').first().text();
  const link = $('.section-main .link-item .d-flex span.flex-fill').text();
  return {name, type, experience, adress, tel, link};
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
module.exports.get = async () => {
  const resp = await axios(URL);
  if (resp.status >= 200 && resp.status < 300){
    var links =[];
    var restaurants=[];

    //TODO

    return null;  
  }
  return null;
  //return result;
};
