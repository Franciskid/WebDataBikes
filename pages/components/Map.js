var axios = require('axios');
var qs = require('querystring');



var stations = []

Refresh = async() => {
      
    console.log("refreshing");
    var q = `PREFIX lg: <https://purl.org/lg/>
    PREFIX ct:<http://www.semanticweb.org/antCordel/ontologies/webSem/project#city>
    PREFIX ns: <http://www.semanticweb.org/antCordel/ontologies/webSem/project#name>
    PREFIX lgt:<http://www.semanticweb.org/antCordel/ontologies/webSem/project#longitude>
    SELECT ?city ?longitude
        WHERE {
            ?subject ct:?city.
      ?subject lgt:?longitude.
            ?subject ns:'Meudon'
    }`;

    axios({
      method: "POST",
      url: "http://localhost:3030/bikes/query",
      data: qs.stringify({ query: q }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }).then((response) => {console.log(response);
      const bindings = response.data.results.bindings;
      bindings.forEach((bind) => {
        
        stations.push(station);
      });
      this.setState({stations:stations})
      console.log(this.state.stations)
    }).catch(err => console.log(err));
  };
  

Refresh();

console.log(stations);