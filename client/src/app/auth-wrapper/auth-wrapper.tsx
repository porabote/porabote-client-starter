import React, {createContext, useEffect, useState} from 'react';
import AuthService from "@/app/local-storage/local-storage-service";
import JwtHandler from "@/app/jwt/jwt-handler";
import LocalStorageService from "@/app/local-storage/local-storage-service";
import {AUTH_URL} from "@/configs";
import Api from "@/services";

type AuthPropsType = {
  children: React.ReactNode;
};

const initialAuth = {
  user: null,
  isAuth: false,
  setIsAuth: Function,
  isAuthInited: false,
  signIn: Function,
  signOut: Function,
  signUp: Function,
};

export const AuthContext = createContext(initialAuth);

const AuthWrapper = (props: AuthPropsType) => {

    const [isAuth, setIsAuth] = useState(false);
    const [isAuthInited, setIsAuthInited] = useState(false);
    const [user, setUser] = useState(initialAuth);

    useEffect(() => {
      setAuth();
    }, [isAuth, isAuthInited]);

    const setAuth = () => {
      let authData = JwtHandler.getTokenData();

      if (authData) {
        setUser(authData);
        setIsAuth(true);
      }

      setIsAuthInited(true);
    }

    const signUp = async (values) => {
      return  await Api.post("/signUp", values, {url: AUTH_URL});
    }

    const signIn = async (accessToken: String) => {
      LocalStorageService.setAccessToken(accessToken);
      const userData = JwtHandler.parsePayload(accessToken);
      setUser(userData);
      setIsAuth(true);
      setIsAuthInited(true);
    }

    const signOut = (callback: Function) => {
      localStorage.removeItem('access_token');
      setIsAuth(false);
      setUser(null);
      callback();
    }

    return (
      <AuthContext.Provider value={{user, isAuth, signIn, signOut, signUp}}>
        {props.children}
      </AuthContext.Provider>
    );
  }
;

export default AuthWrapper;