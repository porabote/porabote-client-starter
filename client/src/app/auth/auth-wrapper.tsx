import React, {createContext, useEffect, useState} from 'react';
import AuthService from "@/app/auth/auth-service";
import JwtHandler from "@/app/auth/jwt-handler";


type AuthPropsType = {
  children: React.ReactNode;
};

const initialAuth = {
  user: null,
  isAuth: false,
  setIsAuth: Function,
  signIn: Function,
  signOut: Function,
  signUp: Function,
};

export const AuthContext = createContext(initialAuth);

const AuthWrapper = (props: AuthPropsType) => {

  const [isAuth, setIsAuth]  = useState(false);
  const [user, setUser] = useState(initialAuth);

  useEffect(() => {
    setAuth();
  }, [isAuth]);

  const setAuth = () => {
    let authData = AuthService.getTokenData();

    if (authData) {
      setUser(authData);
      setIsAuth(true);
    }
  }

  const signUp = async (values, callback) => {
    let res = await AuthService.signUp(values);

    if (callback) {
      callback(res);
    }
  }

  const signIn = async (values, callbackSuccess, callbackError) => {

    const res = await AuthService.signIn(values);
    if (res.error && callbackError) {
      callbackError(res);
      return;
    }

    const accessToken: string | null = AuthService.getToken();

    if (accessToken) {

      const userData = JwtHandler.parsePayload(accessToken);
      setUser(userData);
      setIsAuth(true);

      callbackSuccess(userData);
    }
  }

  const signOut = (callback: Function) => {
    localStorage.removeItem('access_token');
    setIsAuth(false);
    setUser(null);
    callback();
  }

  return(
    <AuthContext.Provider value={{user, isAuth, signIn, signOut, signUp}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;