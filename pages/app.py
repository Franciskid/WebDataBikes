import requests 

def StationsProches():
    print('enter a longitutde')
    long = input('')
    print('enter a latitude')
    latit = input('')
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>

SELECT DISTINCT ?id  ?lat ?lng ?bikeCapacity ?dist

WHERE {{
        ?x stat:id ?id .
        ?x stat:bikeCapacity ?bikeCapacity .
        ?x stat:lng ?lng .
        ?x stat:lat ?lat .
        BIND(((?lng-{long})*(?lng-{long}))+((?lat-{latit})*(?lat-{latit})) AS ?dist)
    }}
ORDER BY ?dist
    LIMIT 5"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    print(f'\n\nVoici les stations les plus proches des coordonées : {long}, {latit}\n\n')
    for obj in result:
        print(f'name: {obj["id"]["value"]}, bicycles: {obj["bikeCapacity"]["value"]}, distance: {obj["dist"]["value"]}, longitute: {obj["lng"]["value"]}, latitude: {obj["lat"]["value"]}\n')
    
StationsProches()



def ListeStations():
    
    query = f"""
    PREFIX stat: <http://www.owl-ontologies.com/unnamed.owl/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>
PREFIX st: <http://ns.inria.fr/sparql-template/>

SELECT DISTINCT ?name ?city 

WHERE {{
        ?x stat:name ?name .
        ?x stat:city ?city .
        
    }}
ORDER BY DESC(?name)"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    print(f'\n\nVoici les stations où il y a le plus de vélos disponibles !  \n\n')
    for obj in result:
        print(f'name: {obj["name"]["value"]} \n')


ListeStations()




def StationsForParis():
    
    query = f"""
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>  
PREFIX xmlns: <http://test.org/onto.owl#>
PREFIX st: <http://ns.inria.fr/sparql-template/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT Distinct ?city ?name
WHERE
{{
    ?a     stat:city   'StEtienne' .
    ?a     stat:name    ?name .
}}"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    print(f'\n\nVoici les stations où il y a le plus de vélos disponibles !  \n\n')
    for obj in result:
        print(f'name: {obj["name"]["value"]} \n')


StationsForParis()



def StationsBikeCapacityGreaterThan(x):
    
    query = f"""
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
  ?s stat:city ?city 
}}"""
    response = requests.post('http://localhost:3030/bikes', data={'query':query})
    
    result = response.json()['results']['bindings']
    print(f'\n\nVoici les stations où il y a le plus de vélos disponibles !  \n\n')
    for obj in result:
        print(f'name: {obj["name"]["value"]} \n')


StationsBikeCapacityGreaterThan(50)