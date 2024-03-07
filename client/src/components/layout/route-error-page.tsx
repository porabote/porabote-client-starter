import React, {useContext, useEffect} from 'react';
import SigninForm from "@/app/auth/templates/signin-form";
import Modal from "@/app/modal";
import Balloon from "@/app/balloon/balloon";
import {ThemeContext} from "@/app/themes/theme-wrapper";
import AuthService from "../../app/auth/auth-service";
import {AuthContext} from "../../app/auth/auth-wrapper";
import {useNavigate, useRouteError} from "react-router-dom";
import {ErrorResponseType} from "../../app/routes/types";

const RouterErrorPage = () => {

  const {theme} = useContext(ThemeContext);
  const {isAuth} = useContext(AuthContext);
  const error: ErrorResponseType | unknown = useRouteError();
  console.error(error);

  return (
    <div className={`main ${theme}`}>

      <div className="header">

      </div>

      <section className="main-section">
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error && error.statusText} {error && error.data}</i>
          </p>
        </div>
      </section>

    </div>
  );
};

export default RouterErrorPage;