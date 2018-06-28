import React from "react";
import * as Axios from "./server";
import { Button } from "primereact/components/button/Button";
import { withRouter } from "react-router-dom";

class Users extends React.Component {
  state = {
    users: [],
  };

  deleteUser = id => {
    const myPromise = Axios.users_delete(id);
    myPromise.then(resp => {
      this.updateUserState(id);
    });
  };

  updateUserState = id => {
    const newArray = this.state.users.filter(item => item.id !== id);
    this.setState({ users: newArray });
  };

  editUser = id => {
    this.props.history.push("/admin/user/" + id);
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((c, index) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.firstName + " " + c.lastName}</td>
                <td>{c.email}</td>
                <td>
                  <Button
                    icon="pi pi-angle-right"
                    onClick={() => this.editUser(c.id)}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => this.deleteUser(c.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Users);
