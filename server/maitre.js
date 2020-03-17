const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult';

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
  const adress = $('.section-main ul.restaurant-details__heading--list li:nth-child(1)').text();
  const tel = $('.section-main .collapse__block-item .d-flex span.flex-fill').first().text();
  const link = $('.section-main .link-item .d-flex span.flex-fill').text();
  return {name, adress, price, type, experience,  tel, link};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async (page) => {
  const response = await axiosaxios({
    method: 'post',
    url: URL,
    data: {
      request_id: 'b5a91c6cc758d4267f55729ad172b154',
      sort: 'undefined',
      page: page
    }
  });
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return data;
    //return parse(data);
  }

  console.error(status);
  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
  const $ = cheerio.load(resp.data);
  let page = 1;
  var restaurants=[];
  let restaurant 
  do {
    console.log(page);
    restaurant = await this.scrapeRestaurant(page);
    restaurants.push(restaurant);
    page++;
  }
  while(restaurants.length!=0);  
  return restaurants;  
};

const toJSON = (restaurant) => {
  return JSON.stringify(restaurant,null, 2)
}

