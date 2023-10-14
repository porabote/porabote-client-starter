import React from "react";
import {Route, Switch} from "react-router-dom";
import AuthContainer from "@app/auth";
import MainPage from "@components/pages";
import ProtectedRoute from "./protected-route";
import UsersContainer from "@components/users";

const Router = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                <ProtectedRoute path="/users/:action/:id?" authAllow={['confirmInvitation']} component={UsersContainer} />
                <Route path="/auth/:action" exact component={AuthContainer}></Route>
            </Switch>
        </div>
    );
};

export default Router;
