import React from "react";
import { Link, NavLink } from 'react-router-dom';



const Header = ({user}) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <a class="navbar-brand" href="/">Cyan</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="/home">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link active" href="/labels">Labels</a>
        <a class="nav-item nav-link active" href="/about">About</a>
        {!user && (
        <React.Fragment><a class="nav-item nav-link active" href="/login">Login</a>
        <a class="nav-item nav-link active" href="/signup">Register</a>
        </React.Fragment>
        )}
        {user && (
        <React.Fragment><a class="nav-item nav-link active" href="/profile">{user.name}</a>
        <a class="nav-item nav-link active" href="/logout">Logout</a>
        </React.Fragment>
        )}  
      </div>
    </div>
  </nav>
    );
}

export default Header;