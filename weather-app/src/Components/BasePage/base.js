import "./base.css";
import SideBar from "../SideBar/sidebar";
import { useState } from "react";
import axios from "axios";
const BasePage = () => {
  const [togglePopup, setToggle] = useState(false);

  let updateToggle = () => {
    setToggle(!togglePopup);
  }


  


  let getWeather = async (event) => {
    event.preventDefault();
    const location = document.getElementById("weather_input").value;
    // console.log(location);
    await axios
      .post("/processZip", {location})
      .then((res) => (console.log("getWeather() : Sent")))
      .catch((err) => console.log(err.data));
  }

  return (
    <>
      <div className="base-container">
        <div className="base-grid">
          <div className="local-area grid-item">
            <SideBar togglePop={updateToggle} isToggled={togglePopup} />
          </div>
          <div className="main-area grid-item">
            <div className="get-w_input">
              {togglePopup ? <div className="weather-box" id="weather-box">
                Please Enter City Name
                <input
                  className="weather-input"
                  id="weather_input"
                  type=""
                  placeholder=""
                ></input>
                <button
                  className="weather-submit"
                  id="w-submit"
                  onClick={(val) => {getWeather(val)}}
                >
                  Submit
                </button>
              </div> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasePage;
