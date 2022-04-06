const jsonld = require('jsonld');
const axios = require('axios');
const fs = require('fs');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

  const bikes_urls = [
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

const weather_urls = [
    {
        name: "Paris",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=da1859f0499d4bc6292009f3df324379&units=metric"
    },
    {
        name:"Lille",
        url:"https://api.openweathermap.org/data/2.5/weather?q=Lille&appid=da1859f0499d4bc6292009f3df324379&units=metric"
    },
    {
        name:"Roubaix",
        url:"https://api.openweathermap.org/data/2.5/weather?q=Roubaix&appid=da1859f0499d4bc6292009f3df324379&units=metric"
    },
    {
        name: "Lyon",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=da1859f0499d4bc6292009f3df324379&units=metric"
    },
    {
        name: "StEtienne",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Saint-Etienne&appid=da1859f0499d4bc6292009f3df324379&units=metric"
    },
    
];


let stations = []
var Paris = (response,temperature) => {
    response = JSON.parse(response);
    let array = response.records;
    var city = "Paris"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.name;
       
        let lat = array[index].geometry.coordinates[1];
        let lng = array[index].geometry.coordinates[0];
        
        let cycleAvailability = array[index].fields.numbikesavailable;
        let parkcapacity = array[index].fields.numdocksavailable;
        
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Lille = (response,temperature) => {
    response = JSON.parse(response);
    let array = response.records;
    var city = "Lille"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.nom;
        let lat = array[index].fields.geo[0];
        let lng = array[index].fields.geo[1];
        let cycleAvailability = array[index].fields.nbvelosdispo;
        let parkcapacity = array[index].fields.nbplacesdispo;
        
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Roubaix = (response,temperature) => {
    response = JSON.parse(response);
    let array = response.records;
    var city = "Roubaix"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].datasetid;
        let name = array[index].fields.localisation;
        let lat = array[index].fields.geo_shape.coordinates[0];
        let lng = array[index].fields.geo_shape.coordinates[1];
        let cycleAvailability = 0;
        let parkcapacity = 10;
        
        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};
        stations.push(station);
    }
};

var Lyon = (response,temperature) => {
    response = JSON.parse(response);
    let array = response.features;
    var city = "Lyon"
    for (let index = 0; index < array.length; index++) {
        let id = response.name;
        let name = array[index].properties.name;
        let lat = Number(array[index].properties.lat);
        let lng = Number(array[index].properties.lng);
        let cycleAvailability = array[index].properties.available_bike_stands;
        let parkcapacity = array[index].properties.available_bikes;

        let station = {id, city, name, lat, lng, bikeCapacity : cycleAvailability, parkCapacity : parkcapacity,temperature:temperature};

        stations.push(station);
    }
};

var StEtienne = (response,temperature) => {
    response = JSON.parse(response);
    let array = response.data.stations;
    var city = "StEtienne"
    for (let index = 0; index < array.length; index++) {
        let id = array[index].station_id;
        let name = array[index].name;
        let lat = array[index].lat;
        let lng = array[index].lon;
        let cycleAvailability = Math.trunc(array[index].capacity/3);
        let parkcapacity = Math.trunc(array[index].capacity/3*2); 
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


var initialize_data = async () => {
    for (let index = 0; index < bikes_urls.length; index++) {
        const bikes_city = await callUrl(bikes_urls[index].url)
        const weather_city = await callUrl(weather_urls[index].url)
        console.log("city : ", bikes_urls[index].name)
        switch (bikes_urls[index].name) {
            case "StEtienne":
                StEtienne(bikes_city, JSON.parse(weather_city).main.temp);
                break;
            case "Lyon":
                Lyon(bikes_city, JSON.parse(weather_city).main.temp);
                break;
            case "Paris":
                Paris(bikes_city, JSON.parse(weather_city).main.temp);
                break;
            case "Lille":
                Lille(bikes_city, JSON.parse(weather_city).main.temp);
                break;
            case "Roubaix":
                Roubaix(bikes_city, JSON.parse(weather_city).main.temp);
                break;
        }
    }
   return stations;
};





async function main(){
    const data = await initialize_data();
    console.log("nombre de stations :",data.length);

    const json_graph = {
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
        "@graph": data
    };
    
    const bikesnt = await jsonld.toRDF(json_graph, {format: 'application/n-quads'});
    fs.writeFileSync('./bikes.nt',bikesnt);

    await axios({
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
    });

    await axios({
        method: "POST",
        url: "http://localhost:3030/bikes",
        data: bikesnt,
        headers: {
            'Content-Type': 'application/n-triples'
        }
    });
}

main()

