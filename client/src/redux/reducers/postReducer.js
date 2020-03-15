import { CREATE_POST , GET_POSTS } from '../actions/types';

const initState = {
    posts : []
};

const postReducer = ( state = initState , action) =>{
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts : [...action.payload]
            };

        case CREATE_POST:
            return{
                ...state,
                posts : [action.payload , ...state.posts]
            };

        default:
            return state;
    };
};

export default postReducer;