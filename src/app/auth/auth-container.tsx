import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Api from "@/services";
import {LOGIN_API_URL} from "./constants";
import {
  authCheck,
  authCheckSuccess,
  loginRequest,
  loginSuccess,
} from "./redux-store/auth-actions";
import LayoutContainer, {LoginLayout} from "@/components/layout";
import {FeedPreloadingPage} from "@/components/pages";

type AuthContainerType = {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const AuthContainer = (props: AuthContainerType) => {

  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isAuth = useSelector((state: {auth: { isAuth: boolean }}) => state.auth.isAuth);

  useEffect(() => {
    authCheck();
  }, []);

  const authCheck = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(authCheckSuccess(access_token));
    }
    setIsAuthChecked(true);
  }

  if (!isAuthChecked) {
    return <FeedPreloadingPage title={`Аутентификация`}/>;
  }

  if (isAuth) {
    return <LayoutContainer/>;
  }

  if (isAuthChecked) {
    return <LoginLayout/>;
  }


}

export default AuthContainer;
