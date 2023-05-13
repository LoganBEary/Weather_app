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

@app.route('/')  # When someone goes to / on the server, execute the following function
@app.route("/index", methods=['POST'])
def index():
    return render_template("index.html")  # Return this message back to the browser

@app.route('/')
@app.route('/login', methods=['POST','GET'])
def login():
    outcome = ""
    try:
        conn = mysql.connector.connect(user='logan', password='Admin12345', host='127.0.0.1',
            database='weather_info', port='13306', auth_plugin="mysql_native_password")
        if request.method == 'POST':
            session['info'] = request.get_json()
            #session['password'] = request.get_json()
            user_a = session['info']['user']
            pass_a = session['info']['password']
            execute = "SELECT user_email, user_password FROM User_Credentials WHERE " \
                "user_email='{user_name}' AND user_password='{pass_w}'".format(user_name=user_a, pass_w=pass_a)
            data = db_execute(conn, execute)
            if data is True:
                outcome = "Can log in!"
            else:
                outcome = "Bad Login"
        conn.close()
        print(outcome)
        return outcome

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    return "OUT"
    
def db_execute(db_con, exc):
    "Only getting User/Pass"
    getData = exc
    # perform vetting of str for SQL injections
    cursor = db_con.cursor()
    cursor.execute(getData)
    db_data = cursor.fetchone()
    # TODO add logic if email exists but pass wrong
    print(db_data)
    if db_data is None:
        return jsonify(False)
    elif db_data[0] is not None:
        return jsonify(True)
    else:
        return jsonify(False)

def find_weather(city_name):
    city_name = city_name.replace(" ", "+")
    try:
        res = requests.get(
            f'https://www.google.com/search?q={city_name}&oq={city_name}&aqs=chrome.0.35i39l2j0l4j46j69i60.6128j1j7&sourceid=chrome&ie=UTF-8', headers=headers)
        print("Loading...")

        soup = BeautifulSoup(res.text, 'html.parser')
        location = soup.select('#wob_loc')[0].getText().strip()
        time = soup.select('#wob_dts')[0].getText().strip()
        info = soup.select('#wob_dc')[0].getText().strip()
        temperature = soup.select('#wob_tm')[0].getText().strip()

        print("Location: " + location)
        print("Temperature: " + temperature + "&deg;C")
        print("Time: " + time)
        print("Weather Description: " + info)
    except:
        print("Please enter a valid city name")

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server
