import { GET_ERROR , CLEAR_ERROR } from '../actions/types';
const initState = {
    msg : {},
    status : ""
};

const errorReducer = ( state = initState , action) =>{
    console.log(action);
    switch(action.type){
        case GET_ERROR:
            return {
                ...state ,
                msg : action.payload.msg,
                status : action.payload.status
            };

        case CLEAR_ERROR:
            return {
                ...state , 
                msg : {},
                status: ""
            };

        default:
            return state;
    };
};

export default errorReducer;
