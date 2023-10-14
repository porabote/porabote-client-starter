import { combineReducers } from "redux";
import authReducer from "@app/auth/redux-store/auth-reducer";

const staticReducers = {
  auth: authReducer,
};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}

export default createReducer;
