import React, {useContext, useEffect} from 'react';
import SigninForm from "@/components/auth/templates/signin-form";
import Modal from "@/app/modal";
import Balloon from "@/app/balloon/balloon";
import {ThemeContext} from "@/app/themes/theme-wrapper";
import {AuthContext} from "@/app/auth-wrapper";
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
      if (location.pathname == '/auth/signIn') {
        navigate('/');
      }
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