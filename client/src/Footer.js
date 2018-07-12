import React from "react";
import "./Footer.css";
import GoogleSignin from "./GoogleSignin";

class Footer extends React.Component {
  render() {
    return (
      <div className="bottomnav">
        <GoogleSignin />
      </div>
    );
  }
}

export default Footer;
