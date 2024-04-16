import React, {useContext, useEffect} from 'react';
import {NavLink, Outlet, useNavigate, useRoutes} from "react-router-dom";
import {useLocation} from "react-router";
import SigninForm from "@/components/auth/templates/signin-form";
import Modal from "@/app/modal";
import Balloon from "@/app/balloon/balloon";
import {ThemeContext} from "@/app/themes/theme-wrapper";
import {AuthContext} from "@/app/auth-wrapper";
import Logo from "@/resources/svg/logo.svg";
import {SettingsContext} from "@app/settings/settings";

const AuthLayout = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {theme} = useContext(ThemeContext);
  const {isAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation()

  const allowedUrls = [
    '/auth/signUp',
    '/auth/password-reset',
    '/auth/password-change',
  ];

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  });

  const switchLang = () => {
    setLang(lang == "ru" ? 'en' : 'ru');
  }

  return (
    <div className={`main-auth ${theme}`}>

      <div style={{textAlign: 'right', padding: '10px 40px'}}>
        {lang == "ru" && <a href="#" onClick={switchLang}>English</a>}
        {lang == "en" && <a href="#" onClick={switchLang}>Рyсский</a>}
      </div>
      <div className="auth-block">

        <div style={{width: '300px', margin: '30px auto 0px auto'}}>
          <NavLink to="/">
            <img alt="Поработе" style={{width: "130px"}} src={Logo}/>
          </NavLink>
        </div>

        {allowedUrls.includes(location.pathname) &&
          <Outlet/>
        }
        {!allowedUrls.includes(location.pathname) &&
          <SigninForm/>
        }

        <Modal/>
        <Balloon/>

      </div>
    </div>
  );
};

export default AuthLayout;