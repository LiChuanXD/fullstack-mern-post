import React , { Component } from 'react';
import { connect } from 'react-redux';

import { createPost } from '../redux/actions/postActions';

class Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : "",
            body : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
        const title = this.state.title;
        const body = this.state.body;
        const postedBy = this.props.user.username;
        this.props.create({title , body , postedBy});
        this.setState({
            title : "",
            body : ""
        });
        this.props.history.push('/')
    }

    render(){
        if(this.props.auth){
            return(
                <div className="card container">
                    <div className="card-header">
                        <h4>Create new post</h4>
                    </div>
                    <div className="card-body">
                        <form method="POST" action="/api/posts" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title :</label>
                                <input required value={this.state.title} onChange={this.handleChange} required className="form-control" name="title" id="title" type="text" placeholder="*Title" />
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="body">Content :</label>
                                <textarea required value={this.state.body} onChange={this.handleChange} required className="form-control" placeholder="*Content" id="body" name="body" style={{resize : "none"}} />
                            </div>
    
                            <button type="submit" className="btn btn-primary">Post</button>
                            
                        </form>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="card container">
                    <div className="card-header">
                    <div className="row alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Please login to create a post.</strong>
                    </div>
                    </div>
                    <div className="card-body">
                        <form method="POST" action="/api/posts" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title :</label>
                                <input disabled value={this.state.title} onChange={this.handleChange} required className="form-control" name="title" id="title" type="text" placeholder="*Title" />
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="body">Content :</label>
                                <textarea disabled value={this.state.body} onChange={this.handleChange} required className="form-control" placeholder="*Content" id="body" name="body" style={{resize : "none"}} />
                            </div>
    
                            <button disabled type="submit" className="btn btn-primary">Post</button>
                            
                        </form>
                    </div>
                </div>
            );
        }
        
    }
};

const mapStateToProps = state =>{
    return{
        auth : state.auth.isAuthenticated,
        user : state.auth.user
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        create : post=>dispatch(createPost(post))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Create);