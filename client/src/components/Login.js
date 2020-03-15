import React , { Component } from 'react';
import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser} from '../redux/actions/authActions';
import { clearError } from '../redux/actions/errorActions';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
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
        this.props.login(this.state);
        this.setState({
            email : "",
            password : ""
        });
    };

    handleClearErr(){
        this.props.clearError();
    };

    render(){
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
                return null;
            };
        };

        if(this.props.auth){
            return <Redirect to="/" />
        }else{
            return(
                <div className="card container">
                    {errMsg()}
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
    
                    <div className="card-body">
                        <form method="POST" action="/api/user/login" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email :</label>
                                <input value={this.state.email} onChange={this.handleChange} type="email" id="email" name="email" placeholder="*Email Address" aria-describedby="emailHelp" className="form-control" />
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="password">Password :</label>
                                <input value={this.state.password} onChange={this.handleChange} type="text" id="password" name="password" placeholder="*Password" className="form-control" />
                            </div>
    
                            <button className="btn btn-primary">Login</button>
                        </form>
                    </div>
    
                    <div className="card-footer text-right">
                        <Link to="/register">Don't have an account?</Link>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = state =>{
    return{
        error : state.error.msg.error,
        auth : state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        login : user=>dispatch(loginUser(user)),
        clearError : ()=>dispatch(clearError())
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(Login);