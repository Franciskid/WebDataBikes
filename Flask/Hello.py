from urllib import request
from flask import *
from flask import url_for
app = Flask(__name__)

@app.route('/')
def home():
   
   return render_template('home.html')


@app.route('/query',methods = ['POST'])
def show_queries_results():   
   if request.method == 'POST':
      user = request.form['nm']
      return user
   
@app.route('/queryselected',methods = ['POST'])
def results():
   return request.form['query']
   
if __name__ == '__main__':
   app.run(debug = True)