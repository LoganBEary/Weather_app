import "./login.css";
import Header from "../Header/header";

function Login() {

    //const cors = require('cors')
    //const app = express();
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
          <button className="login-submit" id="submit" onClick={NaN}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
