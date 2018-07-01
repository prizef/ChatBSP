import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Header;
