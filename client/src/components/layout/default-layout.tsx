import React, {useContext, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom"
import Header from "./header";
import Navbar from "./elements/navbar";
import Modal from "@/app/modal";
import Balloon from "@/app/balloon/balloon";
import {AuthContext} from "@/app/auth-wrapper";
import {ThemeContext} from "@/app/themes/theme-wrapper";
import "@/resources/styles/style.less";
import "@/resources/styles/form-modifier.less";
import "@/resources/styles/style-modifier.less";

const DefaultLayout = () => {

  const navigate = useNavigate();
  const {isAuth, isAuthInited} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    if (!isAuth && isAuthInited) {
      navigate('/auth/signIn', {replace: true});
    }
  }, [isAuth]);

  return (
    <div className={`main ${theme}`}>
      <Navbar/>
      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <Outlet/>
      </section>

      <Modal/>
      <Balloon/>

    </div>
  );
};

export default DefaultLayout;
