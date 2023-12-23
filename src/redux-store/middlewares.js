import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { all } from "redux-saga/effects";
import authWatcher from "@app/auth/redux-store/auth-saga";

const staticSagas = [authWatcher()];

const createSaga = (asyncSaga = []) =>
  function* () {
    return yield all([...staticSagas, ...asyncSaga]);
  };

const sagaMiddleware = createSagaMiddleware();

export { createSaga, sagaMiddleware, thunkMiddleware };
