import { combineReducers } from 'redux';
import postReducer from './postReducer';
import registerReducer from './registerReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    post : postReducer,
    register : registerReducer,
    error : errorReducer,
    auth : authReducer
});

export default rootReducer;