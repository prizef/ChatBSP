import React from "react";
import background from "./background.jpg";
import { Button } from "primereact/components/button/Button";
import "./Welcome.css";

class Welcome extends React.Component {
  render() {
    return (
      <div className="banner">
        <img className="bgimage" src={background} alt="background" />
        <div className="overlay">prize</div>
        <div className="bottomNav1">
          <Button label="Link" className="ui-button-primary" />
        </div>
        <div className="bottomNav2">
          <Button label="Link" className="ui-button-primary" />
        </div>
        <div className="bottomNav3">
          <Button label="Link" className="ui-button-primary" />
        </div>
      </div>
    );
  }
}

export default Welcome;
