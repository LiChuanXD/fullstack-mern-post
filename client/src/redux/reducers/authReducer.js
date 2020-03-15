import { LOGIN_SUCCESS , LOGIN_ERROR , LOGOUT_SUCCESS , AUTH_ERROR } from '../actions/types';

const initState = {
    token : localStorage.getItem('token'),
    isAuthenticated : false,
    user : null
};

const authReducer = ( state = initState , action ) =>{
    console.log(action);
    switch(action.type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated : true,
                token : action.payload.token,
                user : action.payload.user
            };

        case LOGIN_ERROR:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                token : null,
                user : null,
                isAuthenticated : false
            };

        default:
            return state;
    };
};

export default authReducer;