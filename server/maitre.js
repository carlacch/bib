const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult';

/**
 * Parse webpage restaurants
 * @param  {String} data - html response
 * @return {Array} restaurants
 */
const parseAllPage = async (data) =>{
  let restaurants = []
  const $ = cheerio.load(data);

  const elem = $('div.col-md-9 > div.annuaire_result_list > div.annuaire_single').toArray();
  for (let i=0 ;i< elem.length ; i++){
    let restau = await parse($,elem[i]);
    restaurants.push(restau);
  }

  return restaurants;
}

/**
 * Parse webpage restaurant
 * @param  {Cheerio} $ - html document
 * @param  {CheerioElement} element
 * @return {Object} restaurant
 */
const parse = async ($, element) => {
  const linkInfo = 'https://www.maitresrestaurateurs.fr'+$(element).find('div.single_desc > div.single_libel').find('a').attr('href');
  const info = await this.scrapeOneRestaurant(linkInfo);
  const name = info.name;
  const tel = $(element).find('div.single_desc > div.single_details > div > div:nth-child(3) > div').text().trim();
  let list = $(element).find('div.single_info3 > div:nth-child(2)').text().trim().split('\n');
  const [ZIPcode, city] = list.pop().trim().split(' ');
  let street = "";
  list.forEach(e => {
    street+=e.trim();
  })
  const adress = street + ", " + city +", "+ZIPcode;
  const link = info.link;
  const speciality = info.speciality;
  //return {name, adress, tel, link, speciality};
  return {name, adress, tel, link, speciality,street,city,ZIPcode};
};

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} name, link, speciality of a restaurant
 */
const parseInfo = data =>{
  const $ = cheerio.load(data);
  const name = $('.ep-container .ep-content .ep-section div.infos-nom').text().trim();
  const spe= $('div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div:nth-child(5) > div.ep-section-body > div > div > div.col-sm-4 > div.subcontent > div').toArray();
  let speciality=[];
  spe.forEach(s =>{
    speciality.push(s.children[0].data);
  })
  const link = $('div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > a').attr('href');
  return {name, link, speciality};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeOneRestaurant = async (url) => {
  const response = await axios({
    url: url,
    headers: {"Content-Type": "charset=ISO-8859-1"},
    responseEncoding: "binary"});
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parseInfo(data);
  }
  console.error(status);
  return null;
};

/**
 * Scrape a given page
 * @param  {String}  page
 * @return {Array} restaurants
 */
module.exports.scrapeRestaurants = async (page) => {
  const response = await axios({
    method: 'post',
    url: URL,
    data: 'request_id=b5a91c6cc758d4267f55729ad172b154'+'&sort=undefined'+`&page=${page}`,    
    responseEncoding: "binary"}
  );
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parseAllPage(data);
  }
  console.error(status);
  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
  let page = 1;
  let all_restaurants=[];
  let restaurants 
  do {
    console.log(page);
    restaurants = await this.scrapeRestaurants(page);
    all_restaurants = all_restaurants.concat(restaurants)
    page++;
  }
  while(restaurants.length!=0);  
  return all_restaurants;  
};

module.exports.test = async () => {
  const url1 = 'https://www.maitresrestaurateurs.fr/profil/1215'
  const response = await axios({
    url: url1, 
    headers: {"Content-Type": "charset=ISO-8859-1"},
    responseEncoding: "binary"});
  const rest = parseInfo(response.data);
  console.log(rest);
}
module.exports.test1 = async () => {
  let rest = await this.scrapeRestaurants(1);
  console.log(rest);
}