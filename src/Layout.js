import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Multiple from "./views/Multiple";
import {Alert} from "react-bootstrap";
import "./styles/styles.scss";

const Layout = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/survey/:survey_id" component={Multiple}/>
                <Route exact path="/:answer_id" component={Multiple}/>
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