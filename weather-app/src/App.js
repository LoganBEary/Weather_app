import "./App.css";
import Header from "./Components/Header/header";
import Login from "./Components/Login/login";
import { createRef, useEffect} from "react";

function App() {
    const background = createRef()

    useEffect(() => {

    })


    return (
      <div className="App">
        <div className="App-background" id="app-back" ref={background}>
          <Header/>
          <Login backgroundRef={background}/>
        </div>
      </div>
    );
}

export default App;
