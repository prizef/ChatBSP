import React, { Component } from "react";
import "./App.css";
import background from "./background.jpg";
import "primereact/resources/themes/omega/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/components/button/Button";
import * as Axios from "./server";
import GoogleSignin from "./GoogleSignin";
import Chat from "./Chat";

class App extends Component {
  state = {
    users: ""
  };

  componentDidMount() {
    const myPromise = Axios.users_getAll();
    myPromise.then(resp => {
      this.setState({
        users: resp.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="banner">
          <img className="bgimage" src={background} alt="background" />
          <div className="header">
            <ul className="topbar-menu">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
          <div className="overlay">Hello!</div>
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
        {/* <pre>{JSON.stringify(this.state, null, 3)}</pre> */}
        <GoogleSignin />
        <Chat />
      </div>
    );
  }
}

export default App;
