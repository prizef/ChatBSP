import React, { Component } from "react";
import "./App.css";
import "primereact/resources/themes/omega/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Admin from "./Admin";
import GoogleSignin from "./GoogleSignin";
import Chat from "./Chat";
import { Route } from "react-router-dom";
import UsersUpdate from "./UsersUpdate";
import Welcome from "./Welcome";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" render={props => <Welcome {...props} />} />
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
