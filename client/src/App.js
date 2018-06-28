import React, { Component } from "react";
import "./App.css";
import background from "./background.jpg";
import "primereact/resources/themes/omega/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/components/button/Button";
import Admin from "./Admin";
import GoogleSignin from "./GoogleSignin";
import Chat from "./Chat";
import { NavLink, Route, Link } from "react-router-dom";
import UsersUpdate from "./UsersUpdate";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="banner">
          <img className="bgimage" src={background} alt="background" />
          <div className="header">
            <div className="topnav">
              <NavLink exact to="/">
                Home
              </NavLink>

              <NavLink exact to="/chat">
                Chat
              </NavLink>

              <NavLink exact to="/admin">
                Admin
              </NavLink>
            </div>
          </div>
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
        <Route exact path="/admin" render={props => <Admin {...props} />} />
        <Route
          exact
          path="/admin/user/:id"
          render={props => <UsersUpdate {...props} />}
        />
        <Route exact path="/chat" render={props => <Chat {...props} />} />
        <GoogleSignin />
      </div>
    );
  }
}

export default App;
