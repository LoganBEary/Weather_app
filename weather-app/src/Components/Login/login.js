import "./login.css";
import Header from "../Header/header";
import {useEffect, useState} from 'react'
import axios from 'axios'

function Login() {

    //const cors = require('cors')
    //const app = express();

  const [loading, isLoading] = useState(false)
  
  let getLogin  = async (event) => {
    event.preventDefault()
    const user = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log(user, password)
    await axios.post('/login',{ user,password }).then(res => isLoading(true))
    .catch(err => console.log(err.data))
  }

  useEffect(() => {

  }, [loading])

  if(loading)
  {
    return (<div>...Loading</div>)
  }

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
          <button className="login-submit" id="submit" onClick={getLogin}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
