import React from "react";
import {BrowserRouter} from "react-router-dom";
import LayoutContainer from "@/components/layout";
import AuthContainer from "@app/auth";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <AuthContainer>
        <LayoutContainer/>
      </AuthContainer>
    </BrowserRouter>
  );
};

export default App;
