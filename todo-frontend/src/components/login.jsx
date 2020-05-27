import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Background from '../images/isi_college.jpg';
import {loginUser} from '../services/authService';


var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { Background } + ")"
  };
class login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const {data} = this.state;
    const result=await loginUser(data.username,data.password);
    if(result.data.length === 0) 
    {
        const errors = {...this.state.errors};
        errors.username = 'Invalid Username or Password';
        this.setState ( {errors});
    }
    else
    {
        const user_id = result.data[0].user_id;
        const user_name = result.data[0].user_name;
        localStorage.setItem('user_id',user_id);
        localStorage.setItem('user_name',user_name);
        window.location = '/';
    }
  };

  render() {
    return (
      <div style={{margin:"50px"}}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default login;
