import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

class LoggedInLinks extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    };

    handleLogout(){
        this.props.logout();
    }

    render(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active mr-3">
                    <NavLink to="/create" className="nav-link">Create New Post</NavLink>
                </li>
    
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.user.username}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button onClick={this.handleLogout} className="dropdown-item">Log Out</button>
                        <button className="dropdown-item" href="https://github.com/LiChuanXD/fullstack-mern-post">GitHub</button>
                    </div>
                </li>
            </ul>
        )
    }
};

const mapStateToProps = state =>{
    return{
        user : state.auth.user
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        logout : ()=>dispatch(logoutUser())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(LoggedInLinks);