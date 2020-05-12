import React, { Component } from "react";
import AddTodo from './AddTodo';
import http from "../services/httpService";
import config from "../config.json";
import PropTypes from 'prop-types';
class Table extends Component {
  state = {
    tasks : [],
    isInEditMode: false
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
handleListDelete =  (id) => {
  this.props.deleteList(id);
}
changeEditMode = () => {
  console.log("edited");
}
  render() {
    return (
      <React.Fragment>
      <br></br>
        <table className="table table-striped table-bordered table-hover">
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
            <tr>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead> 
          <tbody>
          {this.state.tasks.map((task) => (
              <tr key={task.todo_id}>
                <td onDoubleClick={this.changeEditMode}> {task.title} </td>
                <td>
                  <button
                    className="glyphicon glyphicon-edit"
                    onClick={() => this.handleUpdate(task)}
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
