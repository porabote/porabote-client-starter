import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import {all} from "redux-saga/effects";

const staticSagas = [];//authWatcher()

const createSaga = (asyncSaga: {[key: string]: any}[] = []) => {
  return function* () {
    yield all([
      ...staticSagas,
      ...asyncSaga,
    ])
  }
}

const sagaMiddleware = createSagaMiddleware();


export {createSaga, sagaMiddleware, thunkMiddleware};
