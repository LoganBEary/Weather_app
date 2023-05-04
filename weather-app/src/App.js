import './App.css';
import BasePage from './Components/BasePage/base';
import Login from "./Components/Login/login"
import {useState} from 'react';

function App() {

  const [login, setLogin] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {
          //add a loading segment for after seeing login change
        }
        {login ? <Login isLoggedIn={setLogin}/> : <BasePage/>}
      </header>
    </div>
  );
}

export default App;
