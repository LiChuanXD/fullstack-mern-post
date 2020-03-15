import { LOGIN_SUCCESS , LOGIN_ERROR , LOGOUT_SUCCESS , AUTH_ERROR } from './types';
import {returnError , clearError} from './errorActions';
import axios from 'axios';

//login
export const loginUser = user => dispatch =>{
    axios.post('/api/user/login' , user)
        .then(res=>{
            dispatch({type : LOGIN_SUCCESS , payload : res.data});
            dispatch(clearError());
        })
        .catch(err=>{
            dispatch(returnError(err.response.data , err.response.status));
            dispatch({type : LOGIN_ERROR});
        });
};

//logout
export const logoutUser = () =>{
    return{type : LOGOUT_SUCCESS};
};

//token config helper function
export const tokenConfig = getState =>{
    //get token from state.auth(reducer).token
    const token = getState().auth.token;
    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    };

    if(token){
        config.headers['x-auth-token'] = token
    };
    return config
};

//to check user constantly to see if tis authenticated
export const loadUser = () => (dispatch , getState) =>{
    axios.get('/api/user' , tokenConfig(getState))
        .then(res=>{
            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            })
        })
        .catch(err=>{
            dispatch(returnError(err.response.data , err.response.status));
            dispatch({type : AUTH_ERROR});
        })
}