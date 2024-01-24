import React, {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Api from "@/services";
import {LOGIN_API_URL} from "./constants";
import {
  authCheckSuccess,
  loginRequest,
  loginSuccess,
} from "./redux-store/auth-actions";
import LayoutContainer from "@/components/layout";
import LoginLayout from "./templates/login-layout";

type AuthContainerType = {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const AuthContainer = (props: AuthContainerType) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: { auth: { isAuth: boolean } }) => state.auth.isAuth);

  // useEffect(() => {
  //   authCheck();
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return React.createElement(LayoutContainer);
  } else {
    return React.createElement(LoginLayout);
  }

}

export default AuthContainer;
