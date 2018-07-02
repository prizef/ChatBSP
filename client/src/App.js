import React, { Component } from "react";
import "./App.css";
import "primereact/resources/themes/omega/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Admin from "./Admin";
import Footer from "./Footer";
import Chat from "./Chat";
import { Route } from "react-router-dom";
import UsersUpdate from "./UsersUpdate";
import Welcome from "./Welcome";
import Header from "./Header";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faCommentDots } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faCommentDots)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="header">
            <Header />
          </div>
          <Route exact path="/" render={props => <Welcome {...props} />} />
          <Route exact path="/admin" render={props => <Admin {...props} />} />
          <Route
            exact
            path="/admin/user/:id"
            render={props => <UsersUpdate {...props} />}
          />
          <Route exact path="/chat" render={props => <Chat {...props} />} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
