import React , { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { registerUser } from '../redux/actions/registerAction';
import { clearError } from '../redux/actions/errorActions';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            email : "",
            password : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearErr = this.handleClearErr.bind(this);
    };

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.register(this.state);
        this.setState({
            username : "",
            email : "",
            password : ""
        })
    };

    handleClearErr(){
        this.props.clearError();
    };

    render(){

        const succMsg = () =>{
            if(!this.props.id){
                return null;
            }else{
                return(
                    <div className="row alert alert-success alert-dismissible fade show" role="alert">
                        <strong>You have registered successfully, now you may log in</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }
        };

        const errMsg = () =>{
            if(this.props.error && this.props.error !== "no token , actions denied"){
                return(
                    <div className="row alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{this.props.error}</strong>
                        <button onClick={this.handleClearErr} type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }else{
                return null
            };
        };

        return(
            <div className="card container">
                {errMsg()}
                {succMsg()}
                <div className="card-header">
                    <h4>Register</h4>
                </div>

                <div className="card-body">
                    <form method="POST" action="/api/user/register" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">User Name :</label>
                            <input value={this.state.username} onChange={this.handleChange} type="text" id="username" name="username" placeholder="*User Name" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" id="email" name="email" placeholder="*Email Address" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password :</label>
                            <input value={this.state.password} onChange={this.handleChange} type="text" id="password" name="password" placeholder="*Password" className="form-control" />
                        </div>

                        <button className="btn btn-primary">Register</button>
                    </form>
                </div>

                <div className="card-footer text-right">
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state =>{
    return{
        id : state.register.id,
        error : state.error.msg.error
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        register : user=>dispatch(registerUser(user)),
        clearError : ()=>dispatch(clearError())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Register);