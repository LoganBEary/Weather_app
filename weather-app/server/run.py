from flask import Flask, render_template # Import flask
import sys
import mysql.connector
from mysql.connector import errorcode
from flask_cors import CORS

sys.path.append('../server')

app = Flask("__main__")
cors = CORS(app)

app = Flask(__name__)  # Setup the flask app by creating an instance of Flask

@app.route('/')  # When someone goes to / on the server, execute the following function
@app.route("/index", methods=['POST'])
def index():
    return render_template("index.html")  # Return this message back to the browser

@app.route('/')
@app.route('/login', methods=['POST','GET'])
def login():
    print("HERE")
    conn = None
    try:
        conn = mysql.connector.connect(user='loganl', password='Admin12345', host='127.0.0.1',
         database='weather_info', port='13306', auth_plugin="mysql_native_password")
        conn.close()
        return "CONNECTED"

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    return "OUT"
    

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server
