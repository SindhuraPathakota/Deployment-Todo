import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import {Route,Switch,Redirect} from 'react-router-dom';


import Home from './components/Home';
import "./App.css";
import Header from './components/header';
import Labels from './components/labels';
import { About } from './components/about';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';




class App extends Component {
 state ={};
 componentDidMount()
 {
  
   const user = {
     id : localStorage.getItem("user_id"),
     name :localStorage.getItem("user_name")
   }
   if(user.id != null) {  this.setState({user}) };
  
 } 

  render() {
    const {user} = this.state;
    return (
      <div>
<Header user={user}/>
        <Switch>
      <Route path="/home" component={Home}/>
      
      <Route path="/labels"component={Labels}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/signup" component={Register}/>
      <Route path="/" exact component={Home}/>
      </Switch>
      </div>    );
  }
}

export default App;
