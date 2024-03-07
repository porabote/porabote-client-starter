import authReducer from "@app/auth/redux-store/auth-reducer";
import modalReducer from "@/app/modal/redux-store/reducer";

const staticReducers = {
  auth: authReducer,
  modal: modalReducer,
};

function createReducer(asyncReducers?: any) {
  return {
    ...staticReducers,
    ...asyncReducers
  };
}

export default createReducer;
