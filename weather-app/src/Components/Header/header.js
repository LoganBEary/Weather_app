import "./header.css";
import { useEffect, useState } from "react";

function Header(props) {

  const [darkMode, setDarkMode] = useState(false)

  function changeDarkMode() {
   //console.log("here")
    if(darkMode){
      setDarkMode(false)
    }
    else
      {
      setDarkMode(true)
      }
}

  useEffect(() => {
    const bdy = document.getElementById('app-back')
    const header = document.getElementById('header-con')
    const header_text = document.getElementById('header-txt')
    const login_box = document.getElementById('login-box') || null;
    //const login_box_btn = document.getElementById('submit') || null;

    if(!darkMode){
      bdy.style.background = "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
      header.style.backgroundColor = "#f5b700";
      header_text.style.color = "black";
      if(login_box != null){
        login_box.style.border = "1px solid black";
      }
    }
    else{
      bdy.style.background = "linear-gradient(0deg, #152028ce 0%, #152028ce 100%)";
      header.style.backgroundColor = "#232B32ce";
      header_text.style.color = "white";
      if(login_box != null){
        login_box.style.border = "1px solid white";

      }
    }
    }, [darkMode]);

  return (
    <div className="header-container" id="header-con">
      <div className="header" id="header-txt">
        Weather App!
        <label className="switch night-mode" id="night">
          <input type="checkbox" onChange={changeDarkMode}/>
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Header;
