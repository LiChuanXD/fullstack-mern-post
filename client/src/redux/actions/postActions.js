import axios from 'axios';
import { CREATE_POST , GET_POSTS} from './types';
import { tokenConfig } from './authActions';
import { returnError } from './errorActions';

export const createPost = post => (dispatch , getState) =>{
    axios.post('/api/post' , post , tokenConfig(getState))
        .then(res=>{
            dispatch({
                type : CREATE_POST,
                payload : res.data
            })
        })
        .catch(err=>dispatch(returnError(err.response.data , err.response.status)));
};

export const getPosts = () => dispatch =>{
    axios.get('/api/post')
        .then(res=>{
            dispatch({
                type : GET_POSTS,
                payload : res.data
            })
        })
        .catch(err=>{if(err) throw err});
};