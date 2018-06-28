import React from "react";
import * as Axios from "./server";
import { Button } from "primereact/components/button/Button";

class UsersUpdate extends React.Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  updateUser = id => {
    Axios.users_update({
      id: id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    });
  };

  componentDidMount() {
    const myPromise = Axios.users_getById(this.props.match.params.id);
    myPromise.then(resp => {
      this.setState({
        id: resp.data.id,
        firstName: resp.data.firstName,
        lastName: resp.data.lastName,
        email: resp.data.email
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <input
            name="firstName"
            type="text"
            maxLength="50"
            placeholder="firstName"
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
        </div>
        <div>
          <input
            name="lastName"
            type="text"
            maxLength="50"
            placeholder="lastName"
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
        </div>
        <div>
          <input
            name="email"
            type="text"
            maxLength="100"
            placeholder="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <Button
          icon="pi pi-refresh"
          onClick={() => this.updateUser(this.state.id)}
        />
      </div>
    );
  }
}

export default UsersUpdate;
