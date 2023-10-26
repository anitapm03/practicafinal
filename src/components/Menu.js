import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/logo2.jpg"

export default class Menu extends Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                Inicio
                </NavLink>
            </div>
        </nav>
      </div>
    )
  }
}
