import { GET_ERROR , CLEAR_ERROR } from './types';

export const returnError = (msg , status) =>{
    return {
        type : GET_ERROR,
        payload : {
            msg,
            status
        }
    };
};

export const clearError = () =>{
    return{
        type : CLEAR_ERROR
    }
};