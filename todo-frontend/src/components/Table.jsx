import React, { Component } from "react";
import AddTodo from './CreateTodo';
import http from "../services/httpService";
import config from "../config.json";
import PropTypes from 'prop-types';
						  
import { Lables } from './labels';
class Table extends Component {
  state = {
    tasks : [],
    isInEditMode: false,
    editedText:'',
    title :'',
    taskPointsId:0,
    givepointsBtnTxt:'Give Points'	  
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
handleUpdate=(task)=>{
  this.setState({eidtTodoId:task.todo_id,
    isInEditMode :!this.state.isInEditMode}) ;
}

updateEditTask= async(task)=>{
let todo_text=''
if(this.state.editedText!='')
{todo_text=this.state.editedText;}
 else{todo_text=task.title}
this.setState({isInEditMode:false,editedText:''});
const obj = { todo_text: `${todo_text}`};  
await http.put(config.postTodo+"/"+task.todo_id ,obj);
const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id);
this.setState({ tasks }); 
 
}
textOnChange=(e)=>{
this.setState({editedText:e.target.value}) ;
}
pointsOnChange=(e)=>{
  this.setState({pointsValue:e.target.value});
}

handleGivePoints= async(task) =>{
  if(this.state.givepointsBtnTxt !=='Save'){
    this.setState({givepointsBtnTxt : 'Save',
    taskPointsId:task.todo_id});
  }else{
    this.setState({givepointsBtnTxt : 'Give Points',taskPointsId:0});
    const body ={task_points:this.state.pointsValue};
   await http.put(config.postPoints+"/"+task.todo_id,body); 
   const { data : tasks } = await http.get(config.getTaskList+ "/" + this.props.id);
   this.setState({ tasks }); 
  }
}

renderDefaultView =(tas)=>{return <td> {tas.title}</td>}														 
  render() {
    return (
      <React.Fragment>
      <div className="container">
        <table  className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr className="change">
              <th>{this.props.title}</th>
              <th><AddTodo addTodo={this.addTodo}/></th>
              <th><button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this List?')) this.handleListDelete(this.props.id)}}>
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
                <td>
                  <div style={{display:'flex'}}>
                    <button style={{marginRight: '8px'}}
                     className="btn btn-info" disabled={this.state.isInEditMode}
                     onClick={() => this.handleUpdate(task)}>
                     Edit
                    </button> 
                   
                    {this.state.taskPointsId===task.todo_id?this.state.givepointsBtnTxt === "Save"?<input style={{width: '10%'}} type="number" defaultValue={task.task_points} onChange={this.pointsOnChange}/>:' ':''}

                    <button className="btn btn-info" onClick={()=> this.handleGivePoints(task)}>{this.state.givepointsBtnTxt}</button>
                    {task.task_points !== 0?<h6 style={{color:'darkblue'}}>Task Points : {task.task_points} </h6>:''}
                  </div>
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
        </div>
      </React.Fragment>
   
    );
  }
}

Table.PropTypes = {
  deleteList : PropTypes.func.isRequied
}
export default Table;
