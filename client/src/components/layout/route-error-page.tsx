import React, {useContext} from 'react';
import {ThemeContext} from "@/app/themes/theme-wrapper";
import {SettingsContext} from "@app/settings/settings";
import {Outlet, useRouteError} from "react-router-dom";
import {ErrorResponseType} from "@/app/routes/types";
import Navbar from "@/components/layout/elements/navbar";
import Header from "@/components/layout/header";
import Modal from "@app/modal";
import Balloon from "@app/balloon/balloon";

const RouteErrorPage = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {theme} = useContext(ThemeContext);

  const error: ErrorResponseType | unknown = useRouteError();

  const switchLang = () => {
    setLang(lang == "ru" ? 'en' : 'ru');
  }

  return (
    <div className={`main ${theme}`}>
      <Navbar/>
      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        {/*<div style={{textAlign: 'right', padding: '10px 40px'}}>*/}
        {/*  {lang == "ru" && <a href="#" onClick={switchLang}>English</a>}*/}
        {/*  {lang == "en" && <a href="#" onClick={switchLang}>Рyсский</a>}*/}
        {/*</div>*/}
        <div className="error-page">
          <h1>Oops! 404!</h1>
          <p>Извините, страницы не существует или у вас не хватает прав.</p>

          <p>
            <i>{error && error.statusText || error && error.message}</i>
          </p>

        </div>
      </section>

      <Modal/>
      <Balloon/>

    </div>

  );
};

export default RouteErrorPage;