from flask import Flask,jsonify, render_template, session, request # Import flask
import sys
import os
from bs4 import BeautifulSoup
import requests
import mysql.connector
from mysql.connector import errorcode
from flask_cors import CORS

"""_summary_

    Returns:
        _type_: _description_
"""

sys.path.append('../server')

app = Flask(__name__)
app.secret_key = os.urandom(36)
cors = CORS(app)  # Setup the flask app by creating an instance of Flask

headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
outcome = None
@app.route('/')  # When someone goes to / on the server, execute the following function
@app.route("/index", methods=['POST'])
def index():
    return render_template("index.html")  # Return this message back to the browser

@app.route('/')
@app.route('/login', methods=['POST','GET'])
def login():
    try:
        conn = mysql.connector.connect(user='logan', password='Admin12345', host='127.0.0.1',
            database='weather_info', port='13306', auth_plugin="mysql_native_password")
        if request.method == 'POST':
            session['info'] = request.get_json()
            #session['password'] = request.get_json()
            user_a = session['info']['user']
            pass_a = session['info']['password']
            execute = "SELECT CASE WHEN EXISTS(SELECT user_email, user_password FROM User_Credentials WHERE user_email='{user_name}' AND user_password='{pass_w}') THEN TRUE ELSE FALSE END".format(user_name=user_a, pass_w=pass_a)
            data = db_execute(conn, execute)
            # see if true
            # print("in Post", data)
            global outcome
            if(data == 1):
                outcome = True
                print("outcome: ", outcome)
            else:

                outcome = False
                print("outcome: ", outcome)
            # Need to send back to redirect for create acc page
        conn.close()
        return jsonify(outcome)

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    return "OUT"


#TODO Get Backend to throttle

@app.route('/')
@app.route('/processZip', methods=['POST','GET'])
def processZip():
    session['info'] = request.get_json()
    zipcode = session['info']['location']
    #print(zipcode)
    weather_data = find_weather(zipcode)
    return "Processed"


def db_execute(db_con, exc):
    "Only getting User/Pass"
    getData = exc
    # perform vetting of str for SQL injections
    cursor = db_con.cursor()
    cursor.execute(getData)
    db_data = cursor.fetchone()[0]
    # TODO add logic if email exists but pass wrong
    return db_data

def find_weather(city_name):
    city_name = city_name.replace(" ", "+")
    print(city_name)
    try:
        url = "https://www.google.com/search?q=" + "weather" + city_name
        html = requests.get(url).content
        print("Loading...")
        soup = BeautifulSoup(html, 'html.parser')
        temperature = soup.find(
            'div', attrs={'class': 'BNeawe iBp4i AP7Wnd'}).text
        time_sky = soup.find(
            'div', attrs={'class': 'BNeawe tAd8D AP7Wnd'}).text
  
        #Precip, Humid, Wind Attributes
        weather_img = soup.find(
            'div', attrs={'class': 'UQT4rd'})
        print(weather_img)
        #precipitation = soup.find('span', attrs={'class':'wob_pp'}).text
        #print(precipitation)
        #humidity = soup.find('span', attrs={'class':'wob_hm'}).text
        #wind = soup.find('span', attrs={'class':'wob_t'}).text
        # formatting data
        sky = time_sky.split('\n')[1]
        print(sky, " + ", temperature)
        #print(precipitation, "+", humidity, "+", wind)
        #return(sky,temperature)
    except:
        print("Please enter a valid city name")

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server
