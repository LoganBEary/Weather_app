import "./login.css";
import { useState } from "react";
import axios from "axios";
import BasePage from "../BasePage/base.js";
import Loading from "../Loading/loading";

function Login(props) {
  const [loading, isLoading] = useState(false);
  const [loaded, hasLoaded] = useState(false);
  //const [loginInfo, setLoginInfo] = useState([]);

  let setLogin = async (event) => {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(user, password);
    await axios
      .post("/login", { user, password })
      .then((res) => isLoading(true))
      .catch((err) => console.log(err.data));
  };

  let getLoginInfo = async () => {
    axios.get("/login").then((res) => {
      //setLoginInfo(res);
      hasLoaded(true);
      isLoading(false);
    });
  };

  if (loading) {
    setTimeout(function () {
      getLoginInfo();
      console.log("Finished");
    }, 3000);

    return <Loading />;
  }

  if (loaded) {
    return (
      <>
        <BasePage />
      </>
    );
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box" id='login-box'>
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
          <button className="login-submit" id="submit" onClick={setLogin}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
