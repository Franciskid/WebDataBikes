from urllib import request
from flask import *
from flask import url_for
from queries import *
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('home.html')


@app.route('/query',methods = ['POST'])
def show_queries_results():   
   
   user = request.form['nm']
   return render_template('result.html',queryresult='résultat de la query specifique entré',intitule_query='la query testé')
   
@app.route('/queryselected',methods = ['POST'])
def results():
   item_selected=request.form['query']
   if(item_selected=='premiere'):
      print("highjvh")
      return render_template('result.html',queryresult=ListeStations(),intitule_query='Liste de toutes les stations')
   if(item_selected=='deuxieme'):
      print("lat : ",  request.form['latlonlat'])
      return render_template('result.html',queryresult=StationsProches(request.form['latlonlat'],  request.form['latlonlon']),intitule_query='Les stations les plus proches de votre position actuelle')
   if(item_selected=='troisieme'):
      return render_template('result.html',queryresult=StationsBikeCapacityGreaterThan(50),intitule_query='Les stations avec une capacité > 50')
   if(item_selected=='paris'):
      return render_template('result.html',queryresult=StationsForCity("Paris"),intitule_query='Toutes les stations à Paris')
   if(item_selected=='stEtienne'):
      return render_template('result.html',queryresult=StationsForCity("StEtienne"),intitule_query='Toutes les stations à St Etienne')
   if(item_selected=='lille'):
      return render_template('result.html',queryresult=StationsForCity("Lille"),intitule_query='Toutes les stations à Lille')
   if(item_selected=='roubaix'):
      return render_template('result.html',queryresult=StationsForCity("Roubaix"),intitule_query='Toutes les stations à Roubaix')
   if(item_selected=='lyon'):
      return render_template('result.html',queryresult=StationsForCity("Lyon"),intitule_query='Toutes les stations à Lyon')
   if(item_selected=='carte'):
      map = Carte(request.form['latlonlat'],  request.form['latlonlon'])
      map.save('templates/map.html')
      return render_template('map.html')
   
   return render_template('result.html',queryresult='',intitule_query='Erreur dans la query sélectionnée')
   
if __name__ == '__main__':
   app.run(debug = True)