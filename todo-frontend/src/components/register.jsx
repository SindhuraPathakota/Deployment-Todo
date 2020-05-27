import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userServises';
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async() => {
      
    const result=await userService.register(this.state.data);
    if(result.status === 400){  
    const errors ={...this.state.errors};
    errors.username = result.data;
    this.setState({ errors});
    }
    else{
        localStorage.setItem('user_id',this.state.data.username);
        localStorage.setItem('user_name',this.state.data.name);
        this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div style={{margin:"50px"}}>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
