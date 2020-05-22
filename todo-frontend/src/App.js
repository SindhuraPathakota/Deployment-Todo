import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import {Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import "./App.css";
import Header from './components/header';
import Labels from './components/labels';
import { About }  from './components/about';
import Login from './components/login';
import Register from './components/register';





class App extends Component {
 

  render() {
    return (
      <div>
<Header/>
        <Switch>
      <Route path="/home" component={Home}/>
      <Route path="/labels" component={Labels}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Register}/>
      <Route path="/" exact component={Home}/>
      </Switch>
      </div>    );
  }
}

export default App;
