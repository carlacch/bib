const maitre = require('./restaurant_maitre.json');
const michelin = require('./restaurant_michelin.json');
const fs = require('fs');

const formatted = (str) => {
    return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const newInfo = (r_mich, r_maitre) =>{
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
    return {name, adress, tel, price, type, experience, speciality, link};
}

const getBibMaitre = () => {
    let bib_restaurant = [];
    michelin.forEach(restau => {
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
                bib_restaurant.push(newInfo(restau, restau_maitre));
                break;
            }
        }
    });
    console.log('done');
    fs.writeFileSync('restaurant_bib.json', JSON.stringify(bib_restaurant,null,2));
    return bib_restaurant;
}

//console.log(michelin.length);
const bib_rest = getBibMaitre();
console.log(bib_rest.length);