import React from 'react'
import About from './About'
import { BrowserRouter as Router, Route, Link,  Switch} from "react-router-dom";

const headerStyle = {
    background: "#222",
    color: "#FFF",
    textAlign: 'center',
    padding: '5px 5px 2px 5px',
    fontSize: "1.5em"
}
export default function Header() {
    return (
        <Router>
        <header style={headerStyle}>
            <span>Todo List App</span>
            <Link to="./About"style={{marginLeft:"20px"}}>About</Link>
        </header>

<Switch>
<Route path="/About" component={About} />
</Switch>
</Router>
    )
}

