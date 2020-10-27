import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Survey from "./views/Survey";
import {Alert} from "react-bootstrap";
import "./styles/styles.scss";

const Layout = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/:id" component={Survey}/>
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