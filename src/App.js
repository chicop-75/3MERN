import React from "react";
import {Home} from "./views/home/home"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {SignUp} from "./views/createAccount/createAccount";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/signUp">
                    <SignUp />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
  );
}


function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;
