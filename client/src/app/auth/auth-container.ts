import React, {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Api from "@/services";
import {LOGIN_API_URL} from "./constants";
import {
  authCheckSuccess,
  loginRequest,
} from "./redux-store/auth-actions";
import LayoutContainer from "@/components/layout";
import LoginLayout from "./templates/login-layout";
import {loginSuccessAction} from "./redux-store/auth-actions";
import {AuthUserType} from "./types";
import {FormContextType} from "../form/types";
import AuthService from "./auth-service";
import JwtHandler from "./jwt-handler";


type AuthContainerType = {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const AuthContainer = (props: AuthContainerType) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: { auth: { isAuth: boolean } }) => state.auth.isAuth);

  const authCheck = () => {
    const accessToken: string | null = AuthService.getToken();
    if (accessToken) {
      const userData = JwtHandler.parsePayload(accessToken);
      dispatch(loginSuccessAction(userData, accessToken));
    }
  }

  const signIn = async (context: FormContextType): Promise<any> => {
    console.log(context);
    const {username, password, account_id} = context.values;
    await AuthService.login(username, password, account_id);

    const accessToken: string | null = AuthService.getToken();

    if (accessToken) {
      const userData = JwtHandler.parsePayload(accessToken);
      dispatch(loginSuccessAction(userData, accessToken));
    }

  }

  useEffect(() => {
    authCheck();
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return React.createElement(LayoutContainer);
  } else {
    return React.createElement(LoginLayout, {signIn});
  }

}

export default AuthContainer;
