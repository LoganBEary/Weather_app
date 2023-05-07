import "./App.css";
import BasePage from "./Components/BasePage/base";
import Login from "./Components/Login/login";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false)

  if (login === false)
    return (
      <div className="App">
        <div className="App-background">
          <header className="App-header">
          <Login hasLoggedIn={setLogin} />
          </header>
        </div>
      </div>
    );
  return(
  <>
  <BasePage/>
  </>)
}

export default App;
