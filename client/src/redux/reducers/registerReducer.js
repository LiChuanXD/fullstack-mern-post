import { REGISTER_SUCCESS , REGISTER_ERROR } from '../actions/types';

const initState = {
    id : ""
};

const registerReducer = ( state = initState , action) =>{
    switch(action.type){
        case REGISTER_SUCCESS:
            return{
                ...state,
                id : action.payload
            };

        case REGISTER_ERROR:
            return{
                ...state,
                id : ""
            };

        default:
            return state;
    };
};

export default registerReducer;