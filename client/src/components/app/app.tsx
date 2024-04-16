import React from "react";
import {RouterProvider} from "react-router-dom";
import AuthWrapper from "@/app/auth-wrapper";
import Settings from "@/app/settings/settings";
import ThemeWrapper from "@/app/themes";
import BalloonWrapper from "@/app/balloon/balloon-wrapper";
import {Provider} from "react-redux";
import router from "@/app/routes";
import store from "@/redux-store";
import ModalWrapper from "@app/modal/modal-wrapper";
import NavsWrapper from "@app/navs-wrapper/navs-wrapper";

const App = () => {

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Settings>
          <AuthWrapper>
            <BalloonWrapper>
              <ModalWrapper>
                <NavsWrapper>
                  <RouterProvider router={router}/>
                </NavsWrapper>
              </ModalWrapper>
            </BalloonWrapper>
          </AuthWrapper>
        </Settings>
      </ThemeWrapper>
    </Provider>
  );
};

export default App;
