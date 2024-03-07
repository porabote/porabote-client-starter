import React, {useContext, useEffect} from 'react';
import SigninForm from "@/app/auth/templates/signin-form";
import Modal from "@/app/modal";
import Balloon from "@/app/balloon/balloon";
import {ThemeContext} from "@/app/themes/theme-wrapper";
import AuthService from "../../app/auth/auth-service";
import {AuthContext} from "../../app/auth/auth-wrapper";
import {Outlet, useNavigate, useRoutes} from "react-router-dom";
import {useLocation} from "react-router";

const AuthLayout = () => {

  const {theme} = useContext(ThemeContext);
  const {isAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation()

  const allowedUrls = [
    '/auth/signUp',
    '/auth/forgotPassword',
  ];

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  });

  return (
    <div className={`main ${theme}`}>

      <div className="header">

      </div>

      <section className="main-section">
        {allowedUrls.includes(location.pathname) &&
        <Outlet/>
        }
        {!allowedUrls.includes(location.pathname) &&
          <SigninForm/>
        }
      </section>

      <Modal/>
      <Balloon/>

    </div>
  );
};

export default AuthLayout;