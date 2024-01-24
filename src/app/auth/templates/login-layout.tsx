import React from "react";
import AuthLogin from "./login-form";
import Header from '@/components/layout/header';
import "@/resources/styles/styles";

const LoginLayout = () => {

  let uri: string = window.location.search;

  return(
    <div className="main">
      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <AuthLogin/>
      </section>

      {/*<Modal/>*/}
      {/*<Confirm/>*/}

    </div>
  );
}

export default LoginLayout;