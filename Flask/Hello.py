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
      return render_template('result.html',queryresult=StationsBikeCapacityGreaterThan(50),intitule_query='la query testé')
   if(item_selected=='quatrieme'):
      return render_template('result.html',queryresult=StationsForParis(),intitule_query='la query testé')
   
   return render_template('result.html',queryresult='',intitule_query='Erreur dans la query sélectionnée')
   
if __name__ == '__main__':
   app.run(debug = True)