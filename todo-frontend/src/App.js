import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UpdateTask from "./components/update";
import FooterPage from './components/footer';
import AddList from './components/AddList';
import AddTodo  from './components/AddTodo';
import Table from './components/Table';
import Header from './components/header';



class App extends Component {
  state = {
    lists : []
  };

  async componentDidMount() {
    const { data : lists } = await http.get(config.getTodoList);
    this.setState({ lists });
  }
 
addList = async(title) =>
{
  const obj = { title: `${title}`};
  await http.post(config.postList, obj);
  const { data : lists } = await http.get(config.getTodoList);
  this.setState({ lists });
}
deleteList = async(id) =>
{
await http.delete(config.getTodoList+"/"+id);
const { data : lists } = await http.get(config.getTodoList);
this.setState({ lists });
}


  render() {
    return (
 <React.Fragment>
 <Header/>
 <br></br>
 <AddList addList={this.addList} />
 <br></br>
 {this.state.lists.map ((list) => (
 <Table key={list.list_id} id={list.list_id} title={list.title} deleteList={this.deleteList} />))}
 <FooterPage/>
 </React.Fragment>
    );
  }
}

export default App;
