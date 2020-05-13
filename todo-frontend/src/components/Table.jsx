import React, { Component } from "react";
import AddTodo from './AddTodo';
import http from "../services/httpService";
import config from "../config.json";
import PropTypes from 'prop-types';
import "../css/table.css";
class Table extends Component {
  state = {
    tasks : [],
    isInEditMode: false,
    eidtTodoId:0,
    editedText:"",
  };
  

async componentDidMount() {
  const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id );
  this.setState({ tasks });
}
addTodo = async (title) =>
{
  const obj = { title: `${title}`};
  await http.post(config.postTodo+"/"+this.props.id, obj);
  const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id);
  this.setState({ tasks });
} 
handleDelete = async (task) => {
  await http.delete(config.getTaskList+"/"+task.todo_id);
  const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id);
  this.setState({ tasks });
};
handleListDelete = (id) => {
  this.props.deleteList(id);
}
changeEditMode = () => {
  console.log("edited");
}

handleUpdate=(task)=>{
  this.setState({eidtTodoId:task.todo_id,
    isInEditMode :!this.state.isInEditMode}) ;
}

updateEditTask= async(task)=>{
this.setState({isInEditMode:false});
let todo_text =this.state.editedText;
const obj = { todo_text: `${todo_text}`};  
await http.put(config.postTodo+"/"+task.todo_id ,obj);
const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id);
this.setState({ tasks }); 
 
}
textOnChange=(e)=>{
this.setState({editedText:e.target.value}) ;
}

renderDefaultView =(tas)=>{return <td> {tas.title} </td>}
  render() {
    return (
      <React.Fragment>
      <br></br>
        <table className="table table-striped table-bordered table-hover container">
          <thead className="thead-dark">
            <tr className="change">
              <th>{this.props.title}</th>
              <th><AddTodo addTodo={this.addTodo}/></th>
              <th><button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleListDelete(this.props.id)}>
                    Delete
                  </button></th>
            </tr>
          </thead> 
          <tbody>
          {this.state.tasks.map((task) => (
              <tr key={task.todo_id}>

                {this.state.eidtTodoId===task.todo_id?this.state.isInEditMode ?
                <td>    
                    <input type="text" defaultValue={task.title} onChange={this.textOnChange} ></input>
                    <button className="btn-success" onClick={()=>this.updateEditTask(task)}>Save</button>
                    <button className="btn-danger" onClick={this.handleUpdate}>X</button>
                </td>
                :this.renderDefaultView(task): this.renderDefaultView(task)}
                {/*this.state.isInEditMode ?<td className={task.todo_id}><input type="text" defaultValue={task.title}></input></td>:<td onDoubleClick={this.changeEditMode}> {task.title} </td>}
                {/* <td onDoubleClick={this.changeEditMode}> {task.title} </td> */}
                <td>
                  <button
                    className="glyphicon glyphicon-edit"
                    onClick={()=> this.handleUpdate(task)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>           
        </table>
      </React.Fragment>
   
    );
  }
}

Table.PropTypes = {
  deleteList : PropTypes.func.isRequied
}
export default Table;
