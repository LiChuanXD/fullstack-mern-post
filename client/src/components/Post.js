import React , { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/postActions';


class Post extends Component{

    render(){
        const postFilter = this.props.posts.filter(x=>x._id === this.props.match.params.id);
        const post = postFilter[0];
        const date = new Date(post.createdAt);
        const created = date.toLocaleString();
        if(post){
            return(
                <div className="card container">
                    <div className="card-header">
                        <h2>{post.title}</h2>
                    </div>

                    <div className="card-body">
                        <p>{post.body}</p>
                    </div>

                    <div className="card-footer text-muted">
                        <p>Posted by : {post.postedBy}</p>
                        <p>{created}</p>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Loading Post...</h1>
                </div>
            )
        }
        
    }
};

const mapStateToProps = state =>{
    return{
        posts : state.post.posts
    };
};


export default connect(mapStateToProps , null)(Post);