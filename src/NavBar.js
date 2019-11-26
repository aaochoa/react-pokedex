import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import app from "./base"

export default class NavBar extends Component {
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link to={'/'} className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Pokedex</Link>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button onClick={() => app.auth().signOut()} className="btn btn-danger">Sign out</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
