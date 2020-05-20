import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "../services/httpService";
import config from "../config.json";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import UpdateTask from './update';
import FooterPage from './footer';
import AddList from './CreateList';
import AddTodo  from './CreateTodo';
import Table from './Table';



class Home extends Component {
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
 <br></br>
 <AddList addList={this.addList} />
 <br></br>
 {this.state.lists.map ((list) => (
 <Table key={list.list_id} id={list.list_id} title={list.title} deleteList={this.deleteList}/>))}
 <FooterPage/>
 </React.Fragment>
    );
  }
}

export default Home;
