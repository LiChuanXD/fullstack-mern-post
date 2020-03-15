import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/actions/postActions';
import { connect } from 'react-redux';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getPosts();
    };

    render(){
        const checkLength = body =>{
            if(body.length > 20){
                return body.slice(0 , 20) + " ..."
            }else{
                return body;
            };
        };

        const postLists = this.props.posts.length ? (
            this.props.posts.map(x=>{
                const date = new Date(x.createdAt);
                const created = date.toLocaleString();
                return(
                    <li key={x._id} className="card col">
                        <div className="card-header">
                            <Link to={"/post/" + x._id}>
                                <h3>{x.title}</h3>
                            </Link>
                        </div>

                        <div className="card-body">
                            <p>{ checkLength(x.body) }</p>
                        </div>

                        <div className="card-footer text-muted">
                            <p>Posted by : {x.postedBy}</p>
                            <p>{created}</p>
                        </div>
                    </li>
                ) 
            })
        ) : (<div><h1>No Posts</h1></div>)
        return(
            <div className="container">
                <ul className="row row-cols-1">
                    {postLists}
                </ul>
            </div>
        )
    }
};

const mapStateToProps = state =>{
    return{
        posts : state.post.posts
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        getPosts : ()=>dispatch(getPosts())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Dashboard);