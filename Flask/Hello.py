from urllib import request
from flask import *
from flask import url_for
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
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query=' la query  testé')
   if(item_selected=='deuxieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   if(item_selected=='troisieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   if(item_selected=='quatrieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   if(item_selected=='cinquieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   if(item_selected=='sizieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   if(item_selected=='septieme'):
      return render_template('result.html',queryresult='ICI VOUS METTEZ LE STRING DU RESULTATS DE LA QUERY (ici sa doit renvoyer le résultat de la 1ere queries',intitule_query='la query testé')
   
   return render_template('result.html',queryresult='',intitule_query='Erreur dans la query séléctionnée')
   
if __name__ == '__main__':
   app.run(debug = True)