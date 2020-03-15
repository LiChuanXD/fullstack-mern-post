import React from 'react';
import { NavLink } from 'react-router-dom';

const LoggedOutLinks = () =>{
    return(
        <ul className="navbar-nav ml-auto">
            <li className="nav-item active mr-3">
                <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>

            <li className="nav-item active mr-3">
                <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>

            <li className="nav-item active mr-3">
                <a className="nav-link" href="https://github.com/LiChuanXD/fullstack-mern-post">GitHub</a>
            </li>
        </ul>
    )
}

export default LoggedOutLinks;