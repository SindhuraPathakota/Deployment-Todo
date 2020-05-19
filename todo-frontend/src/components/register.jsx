import React, {Component} from 'react';
//import { ChromePicker } from 'react-color';


export class Register extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          username:"",  
          email: "",
          password: "",
          repassword:"",
        };
      }
    
      render() {
        const { email, password,username,repassword } = this.state;
        return (
            <div className="registerform">
            <h3>SignUp To Cyan</h3>
          <form  className="signupform" onSubmit={this.handleSubmit}>
          <label  htmlFor="UserName">UserName</label>
          <input
              name="UserName"
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={this.handleChange}
            />
          
          <label htmlFor="email">Email</label>
            
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleChange}
            />
            <label htmlFor="email">RePassWord</label>
            <input
              name="RePassWord"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleChange}
            />
            <button type="submit">SignUp</button>
          </form>
          </div>
        );
      }
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    
      handleSubmit = event => {
        console.log("Submitting");
        console.log(this.state);
      };
    }
export default Register;