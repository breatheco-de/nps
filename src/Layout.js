import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from "./views/App";


const Layout = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/:id" component={App}/>
            </Switch>
        </Router>
    );
}

export default Layout;