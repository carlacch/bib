const maitre = require('./restaurant_maitre.json');
const michelin = require('./restaurant_michelin.json');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


/**
 * Formatte a string without any accent and in all caps
 * @param  {String} str
 * @return {String} formattedString
 */
const formatted = (str) => {
    return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


/**
 * Decode an adress to latitude and longitude
 * @param  {String} adress
 * @return {lat, lng} geolocalisation
 */
const geodecode = async (adress) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${adress}&key=${process.env.GEODECODE_API_KEY}&pretty=1`;
    const result = await axios(url);
    const {data , status} = result; 
    if (status >= 200 && status < 300) {
        return data.results[0].geometry;
      }
    console.error(status);
    return null;    
}

/**
 * Give a new datails restaurant
 * @param  {Object} restaurant michelin
 * @param  {Object} restaurant maitre
 * @param  {int}    id
 * @return {Object} restaurant
 */
const newInfo = async (r_mich, r_maitre, _id) =>{
    const id = _id;
    const name = r_maitre.name;
    const adress = r_mich.adress;
    let tel = r_mich.tel;
    if (tel == ""){
        tel = r_maitre.tel;
    }
    let link = r_mich.link;
    if(link == "" && r_maitre.link !== undefined){
        link = r_maitre.link;
    }
    const price = r_mich.price;
    const type = r_mich.type;
    const experience = r_mich.experience;
    const speciality = r_maitre.speciality;
    const geolocalisation = await geodecode(adress);
    return {id, name, adress, tel, price, type, experience, speciality, link, geolocalisation};
}

/**
 * Get a list of all Maître restaurants with Bib Gourmand distinction 
 * @return {Array} restaurants
 */
const getBibMaitre = async () => {
    let bib_restaurant = [];
    let _id=0;
    for (let j=0 ; j < michelin.length ; j++){
        let restau = michelin[j];
        const name = formatted(restau.name);
        console.log(name);
        let [street,city,ZIPcode,country] = restau.adress.split(', ');
        const tel = restau.tel.replace("+33 ",'0');
        city = formatted(city);
        for (let i=0 ; i<maitre.length ; i++){
            const restau_maitre = maitre[i];
            if ((name.includes(formatted(restau_maitre.name))  || formatted(restau_maitre.name).includes(name)) && ZIPcode == restau_maitre.ZIPcode ) {
                console.log(restau);
                console.log(restau_maitre);
                let newres = await newInfo(restau, restau_maitre, _id);
                bib_restaurant.push(newres);
                _id++;
                break;
            }
        }
    }
    console.log('done');
    fs.writeFileSync('./restaurant_bib.json', JSON.stringify(bib_restaurant,null,2));
    return bib_restaurant;
}

//console.log(michelin.length);
const bib_rest = getBibMaitre();
//console.log(bib_rest.length);

//geodecode("67 chemin de la Messe, Perros-Guirec, 22700, France");