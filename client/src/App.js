import './App.css';

import React , { Component } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store/store';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';

import { loadUser } from './redux/actions/authActions';

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  };

  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="App container-fluid">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/post/:id" component={Post} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}


export default App;
