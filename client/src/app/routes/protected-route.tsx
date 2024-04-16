import React, {FC} from "react";
import {useSelector} from "react-redux";
import {redirect, Route} from "react-router-dom";
import {LOGIN_ACTION} from "../__auth/constants";

export type {IMatch} from "@app/types/ts-react-types";

type ProtectedRouteType = {
  Component: FC;
  authAllow?: string[];
};

const ProtectedRoute = (props: ProtectedRouteType) => {

  let {Component, authAllow} = props;

  const {isAuth} = useSelector((state: { auth: { isAuth: boolean } }) => state.auth);

  return (
    <Route
      {...routeProps}
      render={(props: {
        match: IMatch<{
          id: string,
          action: string,
        }>, location: string
      }) => {

        let isMethodAllowed = false;
        if (authAllow) {
          authAllow.forEach((allow: string, index: number) => {
            if (allow == props.match.params.action) {
              isMethodAllowed = true;
              break;
            }
          });
        }

        if (isAuth || isMethodAllowed) {
          return <Component {...props} />;
        } else {
          return redirect(LOGIN_ACTION, props.location);
        }
      }
      }/>
  );

};

export default ProtectedRoute;