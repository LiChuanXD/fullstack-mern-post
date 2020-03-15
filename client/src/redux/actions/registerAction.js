import axios from 'axios';
import { REGISTER_SUCCESS , REGISTER_ERROR } from './types';

import {returnError , clearError} from './errorActions';

export const registerUser = user => dispatch =>{
    axios.post('/api/user/register' , user)
        .then(res=>{
            dispatch({
                type : REGISTER_SUCCESS,
                payload : res.data
            });
            dispatch(clearError());
        })
        .catch(err=>{
            dispatch(returnError(err.response.data , err.response.status));
            dispatch({type : REGISTER_ERROR});
        })
}