import "./App.css";
import BasePage from "./Components/BasePage/base";
import Login from "./Components/Login/login";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { ReactQueryDevTools } from "react-query/devtools";
import axios from "axios";

function App() {
  const [login, setLogin] = useState(false);

  async function fetchCredentials() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  }

  const { data, error, isError, isLoading } = useQuery(
    "posts",
    fetchCredentials
  );



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
