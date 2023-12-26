import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BasePage from "../BasePage/base.js";
import Loading from "../Loading/loading";

function Login(props) {
  const [loading, isLoading] = useState(false);
  const [loaded, hasLoaded] = useState(false);
  //const [submitted, hasSubmitted] = useState(false)
  //const [pasted, setPaste] = useState('')

  const [enteredEmail, setEnteredEmail] = useState('')
  const [containsLetter, setLetter] = useState(false)
  //const [pasted, setPasteToggle] = useState(false)
  const regExp = /[@]/g
  let enteredEmailIsValid = (enteredEmail.trim() !== '' && regExp.test(enteredEmail) && enteredEmail.length >= 6)

  /*const handlePaste = (event) => {
    setPaste(event.clipboardData.getData('text'))
    console.log(pasted)
    enteredEmailIsValid = (pasted !== '' && regExp.test(pasted) && pasted.length >= 6) 
    console.log("here")
    //emailInputChangeHandler(pasted)
  }
*/
  let formIsValid = false
  if (enteredEmailIsValid && !containsLetter) {
    formIsValid = true
  }


 // Neet do update DOM based on pasting

  const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value)
        //console.log(event.target.value)
        let cont = regExp.test(event.target.value)
        if (cont === true) 
          setLetter(true)
        else setLetter(false)
  }

  const handlePaste = event => {
    let data = event.clipboardData.getData('text') 
    enteredEmailIsValid = (data.trim() !== '' && regExp.test(data) && data.length >= 6)
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()
    // send zip to backend here
    // set if valid or not
    if (!enteredEmailIsValid) {
      return
    }
    setEnteredEmail('')
  //  setPasteToggle(false)

  }


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
      //TODO Work on if true then continue to base page. 
      // if not then stay and reset w/ warning

      //if(res.data === true){
      hasLoaded(true);
      isLoading(false);

      return
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
    // TODO Work on allowing pasting to update State
    <>
    <form onSubmit={formSubmissionHandler} autoComplete="off">
      <div className="login-container">
        <div className="login-box" id='login-box'>
          <input
            className="login-input"
            id="username"
            type="email"
            placeholder="Email"
            onInput={emailInputChangeHandler}
            onPaste={handlePaste}
            autoComplete={console.log("done")}
            value={enteredEmail}
          ></input>
          <input
            className="login-input"
            id="password"
            type="password"
            placeholder="Password"
          ></input>
          <button className="login-submit" id="submit" onClick={setLogin}
          disabled={!formIsValid}>
            Submit
            {
            // need to create handler for if input is empty
            }
          </button>
        </div>
      </div>
      </form>
    </>
  );
}

export default Login;
