import "./login.css";
import Header from "../Header/header";
import express from 'express';


function Login() {

    //const cors = require('cors')
    //const app = express();
    const mysql = require('mysql');

  var submitCred = (param) => {
    let email = document.getElementById("username");
    let pass = document.getElementById("password");
    console.log("HERE")
    //TODO ERROR HERE
    //fetchMyCredentials();
  };
/*
   function fetchMyCredentials() {
    const db = mysql.createConnection({
      host: "localhost",
      user: "loganl",
      password: "Admin12345",
      database: "weather_info",
      port: 13306,
    });

    db.connect(function (err) {
      if (err) throw err;
      db.query(
        "SELECT * from User_Credentials",
        function (err, result, fields) {
          if (err) console.log(err);
          console.log(fields);
        }
      );
    });
  }
*/
  return (
    <>
      <Header />
      <div className="login-container App-background">
        <div className="login-box">
          <input
            className="login-input"
            id="username"
            type="email"
            placeholder="Email"
          ></input>
          <input
            className="login-input"
            id="password"
            type="password"
            placeholder="Password"
          ></input>
          <button className="login-submit" id="submit" onClick={submitCred}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
