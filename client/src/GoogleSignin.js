import React from "react";
import * as Server from "./server";
import {Button} from 'primereact/components/button/Button';

window.gapi.load("auth2", () => {
  window.gapi.auth2.init({
    client_id:
      "58772775873-oma31jtiqhph7os62h7i9a37makcilfr.apps.googleusercontent.com"
  });
});

class GoogleSignin extends React.Component {
  logOutGoogle() {
    if (
      window.gapi.auth2 &&
      window.gapi.auth2.getAuthInstance().isSignedIn.get()
    ) {
      console.log("Will sign out of Google");
      var auth2 = window.gapi.auth2.getAuthInstance();
      return auth2.disconnect().then(function() {
        console.log("Signed out of Google");
      });
    } else {
      return Promise.resolve();
    }
  }

  componentDidMount() {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 50,
      height: 50,
      longtitle: false,
      theme: "dark",
      onsuccess: this.onSignin,
      onfailure: this.onFailure
    });
  }

  onSignin = googleUser => {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("User signed in. " + id_token);
    Server.users_googleSignin({
      googleToken: id_token
    })
      .then(response => {
        console.log(response.data);
        Server.users_getCurrentUser().then((response) => {
          console.log(response.data.id);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onFailure(error) {
    console.log(error);
  }

  onSignOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log("Signed out of Google");
    });
  }

  revokeAccess() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function() {
      console.log("Google access revoked");
    });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div id="my-signin2" />

        <Button label="Sign out" icon="pi pi-check" onClick={this.logOutGoogle} />
      </div>
    );
  }
}

export default GoogleSignin;
