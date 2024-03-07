import React, {useContext} from "react";
import SigninForm from "./signin-form";
import Header from '@/components/layout/header';
import "@/resources/styles/styles";
import {FormContextType} from "../../form/types";
import {AuthContext} from "../auth-wrapper";
import {Outlet} from "react-router-dom";
import {ThemeContext} from "../../themes/theme-wrapper";

const LoginLayout = () => {

  const {theme} = useContext(ThemeContext);
  let uri: string = window.location.search;

  return(
    <div className={`main ${theme}`}>
      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <Outlet/>
      </section>

    </div>
  );
}

export default LoginLayout;