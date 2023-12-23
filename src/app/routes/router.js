import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthContainer from "@app/auth";
import { MainPage } from "@components/pages";
import UsersContainer from "@components/users";
import ProtectedRoute from "./protected-route";

const Router = () => (
  <div>
    <Routes>
      <ProtectedRoute path="/" exact component={MainPage} />
      <ProtectedRoute
        path="/users/:action/:id?"
        authAllow={["confirmInvitation"]}
        component={UsersContainer}
      />
      <Route path="/auth/:action" exact component={AuthContainer}></Route>
    </Routes>
  </div>
);

export default Router;
