import React from "react";
import Router from '@app/routes/router';
// import AuthLogin from "@components/auth/auth-login";
// import Modal from 'porabote/modal';
// import Confirm from "porabote/confirm";
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
        {/*<AppRouter/>*/}
      </section>

      {/*<Modal/>*/}
      {/*<Confirm/>*/}

    </div>
  );
}

export default LoginLayout;