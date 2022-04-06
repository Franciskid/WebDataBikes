from ast import Str
import requests 

def StationsProches(lat, lon):
    # print('enter a longitutde')
    # long = input('')
    # print('enter a latitude')
    # latit = input('')
    latit = lat 
    long = lon 
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>

SELECT *

WHERE {{
        ?x stat:id ?id .
        ?x stat:city ?city .
        ?x stat:name ?name .
        ?x stat:bikeCapacity ?bikeCapacity .
        ?x stat:lng ?lng .
        ?x stat:lat ?lat .
        BIND(((?lng-{long})*(?lng-{long}))+((?lat-{latit})*(?lat-{latit})) AS ?dist)
    }}
ORDER BY ?dist
    LIMIT 50"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    str = []
    str.append(['City', 'Name', 'Bike Capacity', 'Distance'])
    str.append([])
    for obj in result:
        str[1].append([f'{obj["city"]["value"]}', f'{obj["name"]["value"]}', f'{obj["bikeCapacity"]["value"]}', f'{(float(obj["dist"]["value"])*10000000):.0f}m'])
    
    return str

#StationsProches()



def ListeStations():
    
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>
PREFIX st: <http://ns.inria.fr/sparql-template/>

SELECT *

WHERE {{
  ?s stat:bikeCapacity ?bikeCapacity .
  ?s stat:name ?name .
  ?s stat:city ?city .
  ?s stat:parkCapacity ?parkCapacity .
  ?s stat:temperature ?temperature .
    }}
ORDER BY DESC(?name)"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    str = []
    str.append(['City', 'Name', 'Bike Capacity', 'Park Capacity', 'Temperature (°C)'])
    str.append([])
    for obj in result:
        str[1].append([f'{obj["city"]["value"]}', f'{obj["name"]["value"]}', f'{obj["bikeCapacity"]["value"]}', f'{obj["parkCapacity"]["value"]}', f'{obj["temperature"]["value"]}°C'])
    return str


#ListeStations()




def StationsForParis():
    
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>
PREFIX st: <http://ns.inria.fr/sparql-template/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>


SELECT *
WHERE
{{
  ?s stat:bikeCapacity ?bikeCapacity .
  FILTER (?city = "Paris") .
  ?s stat:name ?name .
  ?s stat:parkCapacity ?parkCapacity .
  ?s stat:city ?city .
  ?s stat:parkCapacity ?parkCapacity .
  ?s stat:temperature ?temperature .
}}"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    str = []
    str.append(['City', 'Name', 'Bike Capacity', 'Park Capacity', 'Temperature (°C)'])
    str.append([])
    for obj in result:
        str[1].append([f'{obj["city"]["value"]}', f'{obj["name"]["value"]}', f'{obj["bikeCapacity"]["value"]}', f'{obj["parkCapacity"]["value"]}', f'{obj["temperature"]["value"]}°C'])
    return str


#StationsForParis()



def StationsBikeCapacityGreaterThan(x):
    
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>
PREFIX st: <http://ns.inria.fr/sparql-template/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT *
WHERE
{{
  ?s stat:bikeCapacity ?bikeCapacity .
  FILTER (?bikeCapacity > {x}) .
  ?s stat:name ?name .
  ?s stat:parkCapacity ?parkCapacity .
  ?s stat:city ?city .
  ?s stat:temperature ?temperature 
}}"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    str = []
    str.append(['City', 'Name', 'Bike Capacity', 'Park Capacity', 'Temperature (°C)'])
    str.append([])
    for obj in result:
        str[1].append([f'{obj["city"]["value"]}', f'{obj["name"]["value"]}', f'{obj["bikeCapacity"]["value"]}', f'{obj["parkCapacity"]["value"]}', f'{obj["temperature"]["value"]}°C'])
    return str


#StationsBikeCapacityGreaterThan(50)