import React from "react";
import Home from "./views/home/home"
import Dashboard from "./views/dashboard/dashboard";
import SignUp from "./views/createAccount/createAccount";

import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Details from "./views/dashboard/detailled/details";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Home}/>
                <Route path="/signUp" component={SignUp}/>
                <PrivateRoute component={Dashboard} />
            </Switch>
        </Router>
  );
}


function PrivateRoute ({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => window.sessionStorage.getItem("JWT") !== null
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

export default App;
