import React, { Component } from 'react';

class Logout extends Component
{
    componentDidMount(){
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");

        window.location = "/login";

    }
    render ()
    {
        return null;
    }
}
export default Logout;