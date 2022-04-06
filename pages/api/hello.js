const jsonld = require('jsonld');
const axios = require('axios');
const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var convert = require('xml-js');

  const urls = [
    {
        name: "Paris",
        url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1368&facet=name&refine.is_installed=OUI"
    },
    {
        name:"Lille",
        url:"https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=242"
    },
    {
        name:"Roubaix",
        url:"https://opendata.roubaix.fr/api/records/1.0/search/?dataset=implantation-des-arceaux-velos-a-roubaix&q=&facet=type&facet=annee"
    },
    {
        name: "Lyon",
        url: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=1.1.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171"
    },
    {
        name: "StEtienne",
        url: "https://saint-etienne-gbfs.klervi.net/gbfs/en/station_information.json"
    }
    
];

const urlVoitures = [
    {
        name: "Paris",
        url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=belib-points-de-recharge-pour-vehicules-electriques-donnees-statiques&q=&facet=statut_pdc&facet=arrondissement&facet=code_insee_commune&facet=implantation_station&facet=nbre_pdc&facet=condition_acces&facet=gratuit&facet=paiement_acte&facet=paiement_cb&facet=paiement_autre&facet=reservation&facet=observations&facet=siren_amenageur&facet=date_mise_en_service&facet=accessibilite_pmr&facet=restriction_gabarit&facet=station_deux_roues&facet=puissance_nominale&facet=prise_type_ef&facet=prise_type_2&facet=prise_type_combo_ccs&facet=prise_type_chademo&facet=prise_type_autre&facet=prise_type_3&facet=horaires&facet=raccordement"
    }
]


const urlsWeather = [
    {
        name: "Paris",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=dcf9521833af767bb716a06812acbba7&units=metric"
    },
    {
        name:"Lille",
        url:"https://api.openweathermap.org/data/2.5/weather?q=Lille&appid=dcf9521833af767bb716a06812acbba7&units=metric"
    },
    {
        name:"Roubaix",
        url:"https://api.openweathermap.org/data/2.5/weather?q=Roubaix&appid=dcf9521833af767bb716a06812acbba7&units=metric"
    },
    {
        name: "Lyon",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=dcf9521833af767bb716a06812acbba7&units=metric"
    },
    {
        name: "StEtienne",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Saint-Etienne&appid=dcf9521833af767bb716a06812acbba7&units=metric"
    },
    
];

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var convert = require('xml-js');

let stations = []
var Paris = (response,responseW) => {
    response = JSON.parse(response);
    responseW = JSON.parse(responseW);
    let array = response.records;
    var city = "Paris"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.name;
       
        let lat = array[index].geometry.coordinates[1];
        let lng = array[index].geometry.coordinates[0];
        
        let cycleAvailability = array[index].fields.numbikesavailable;
        let parkcapacity = array[index].fields.numdocksavailable;
        let temperature = Math.round(responseW.main.temp)
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Lille = (response,responseW) => {
    response = JSON.parse(response);
    responseW = JSON.parse(responseW);
    let array = response.records;
    var city = "Lille"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.nom;
        let lat = array[index].fields.geo[0];
        let lng = array[index].fields.geo[1];
        let cycleAvailability = array[index].fields.nbvelosdispo;
        let parkcapacity = array[index].fields.nbplacesdispo;
        let temperature = Math.round(responseW.main.temp)
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Roubaix = (response,responseW) => {
    response = JSON.parse(response);
    responseW = JSON.parse(responseW);
    let array = response.records;
    var city = "Roubaix"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.localisation;
        let lat = array[index].fields.geo_shape.coordinates[0];
        let lng = array[index].fields.geo_shape.coordinates[1];
        let cycleAvailability = 0;
        let parkcapacity = 10;
        let temperature = Math.round(responseW.main.temp)
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Lyon = (response,responseW) => {
    response = JSON.parse(response);
    responseW = JSON.parse(responseW);
    let array = response.features;
    var city = "Lyon"
    for (let index = 0; index < array.length; index++) {
        let id = response.name;
        let name = array[index].properties.name;
        let lat = Number(array[index].properties.lat);
        let lng = Number(array[index].properties.lng);
        let cycleAvailability = array[index].properties.available_bike_stands;
        let parkcapacity = array[index].properties.available_bikes;
        let temperature = Math.round(responseW.main.temp)
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var StEtienne = (response,responseW) => {
    response = JSON.parse(response);
    responseW = JSON.parse(responseW);
    let array = response.data.stations;
    var city = "StEtienne"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].station_id;
        let name = array[index].name;
        let lat = array[index].lat;
        let lng = array[index].lon;
        let cycleAvailability = Math.trunc(array[index].capacity/3);
        let parkcapacity = Math.trunc(array[index].capacity/3*2); 
        let temperature = Math.round(responseW.main.temp)
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};



var callUrl = async (url) => {
    xhr.open('GET', url, false);
    xhr.send(null);
    var response = xhr.responseText;
    return await response;
};


var getData = async () => {
    for (let index = 0; index < urls.length; index++) {
        const response = await callUrl(urls[index].url)
        const responseW = await callUrl(urlsWeather[index].url)
        console.log(index, urls[index].name)
        switch (urls[index].name) {
            case "StEtienne":
                StEtienne(response,responseW);
                break;
            case "Lyon":
                Lyon(response,responseW);
                break;
            case "Paris":
                Paris(response,responseW);
                break;
            case "Lille":
                Lille(response,responseW);
                break;
            case "Roubaix":
                Roubaix(response,responseW);
                break;
        }
    }
   return stations
};





async function main(){
    const stat = await getData()
    console.log("stats : ", stat)
    console.log("nombre de stations :",stat.length)
    const myjson = {
        "@context": {
        "@vocab" : "http://www.owl-ontologies.com/unnamed.owl/",
        "id" : "id",
        "city" : "city",
        "name": "name",
        "bikeCapacity": "bikeCapacity",
        "parkCapacity": "parkCapacity",
        "lat":"lat",
        "lng":"lng",
        "temperature":"temperature"
        },
        "@graph": stat
    }
    
    const ntrip = await jsonld.toRDF(myjson, {format: 'application/n-quads'});
    fs.writeFileSync('./bikes.nt',ntrip)
    const resDelete = await axios({
        method: "POST",
        url: "http://localhost:3030/bikes/",
        headers : {
            'Content-type': 'application/sparql-update'
        },
        data: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        clear default`
    })

    const resUpdate = await axios({
        method: "POST",
        url: "http://localhost:3030/bikes",
        data: ntrip,
        headers: {
            'Content-Type': 'application/n-triples'
        }
    })
    return {"john":"doe"}
}

main()

