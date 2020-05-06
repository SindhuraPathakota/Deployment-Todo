import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import TodoList from './components/TodoList'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import uuid from 'uuid';
import axios from 'axios';
import About from './components/layout/About';

class App extends Component {

  state = {
    todoTitles: []
  }

  componentDidMount(){
    this.getTitles();
  }

  getTitles() {
    axios.get('/GetTitles')
    .then(res => this.setState({ todoTitles: res.data.data}));
  }

  addTodoList= (title, todo) => {
    axios.post(`/AddTodo?todo='${todo}'&title='${title}'`).then(res => console.log(res)).then(() => this.getTitles());
  }

  render() {
    var appBody =
        this.state.todoTitles.map((todos) => (
          <Todos key={uuid.v4()} todoTitles={todos} getTitle={this.getTitles.bind(this)} />
        ));
    return (
      <div className="body">
        <Header />

        <div className="myContainer">
        {appBody}
        <TodoList addTodoList={this.addTodoList}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
