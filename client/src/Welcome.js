import React from "react";
import background from "./background.jpg";
import "./Welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <div className="banner">
        <img className="bgimage" src={background} alt="background" />
        <div className="overlay">prize</div>
        <div className="bottomNav1">
          <NavLink exact to="/">
            <FontAwesomeIcon icon="chevron-left" />
          </NavLink>
        </div>
        <div className="bottomNav2">
          <NavLink exact to="/chat">
            <FontAwesomeIcon icon="code" />
          </NavLink>
        </div>
        <div className="bottomNav3">
          <NavLink exact to="/">
            <FontAwesomeIcon icon="chevron-right" />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Welcome;
