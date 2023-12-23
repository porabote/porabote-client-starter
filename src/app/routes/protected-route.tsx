import React, {FC} from "react";
import {useSelector} from "react-redux";
import {redirect, Route} from "react-router-dom";
import {LOGIN_ACTION} from "@app/auth/constants";
export type { IMatch } from "@app/types/ts-react-types";

type ProtectedRouteType = {
  Component: FC;
  authAllow: string[];
};

const ProtectedRoute = (props: ProtectedRouteType) => {

  const routeProps = {...props};
  const Component = routeProps.Component;
  const authAllow = routeProps.authAllow || [];

  const {isAuth} = useSelector((state: {auth: {isAuth: boolean}}) => state.auth);

  return (
    <Route
      {...routeProps}
      render={(props: {match: IMatch<{
          id: string,
          action: string,
        }>, location: string}) => {

        let isMethodAllowed = false;
        for (var i = 0; i < authAllow.length; i++) {
          if (authAllow[i] == props.match.params.action) {
            isMethodAllowed = true;
            break;
          }
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