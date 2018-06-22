import React, { Component } from "react";
import "./App.css";
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import * as Axios from "./server";
import GoogleSignin from "./GoogleSignin";

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
        <pre>{JSON.stringify(this.state, null, 3)}</pre>
        <GoogleSignin />
      </div>
    );
  }
}

export default App;
