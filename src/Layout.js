import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from "./views/App";
import {Alert} from "react-bootstrap";
import "./views/App.scss";

const Layout = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/:id" component={App}/>
                <Route render={() => 
                    <div className="container">
                        <Alert 
                        variant="danger" 
                        className="shadow-one mt-4">
                            Wrong path, please specify an ID and access token to vote.
                        </Alert>
                    </div>
                    }
                />
            </Switch>
        </Router>
    );
}

export default Layout;