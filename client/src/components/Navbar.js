import React from 'react';
import { NavLink } from 'react-router-dom';

import LoggedOutLinks from './LoggedOutLinks';
import LoggedInLinks from './LoggedInLinks';

import { connect } from 'react-redux';

const Navbar = ({auth}) =>{
    const navSwitch = () =>{
        if(auth){
            return <LoggedInLinks />
        }else{
            return <LoggedOutLinks />
        }
    };
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
            <NavLink to="/" className="navbar-brand">Home</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {navSwitch()}
            </div>
        </nav>
    )
};

const mapStateToProps = state =>{
    return{
        auth : state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps , null)(Navbar);