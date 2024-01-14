import {createStore, compose, applyMiddleware, Dispatch} from "redux";
import {createSaga, sagaMiddleware, thunkMiddleware} from "./middlewares";
import createReducer from "./root-reducer";

const store = createStore(
  createReducer(),
  compose(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
    )
  ),
);

let asyncReducers: {[key: string]: any} = {};
let asyncSagas: {[key: string]: any}[] = [];
let asyncSagasReg: {[key: string]: any} = {};

let sagaTask = sagaMiddleware.run(createSaga(asyncSagas));

export let registrationReducer: (key: string, asyncReducer: any) => void = (key, asyncReducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(asyncReducers))
  }
}

export let registrationSaga: (key: string, asyncSaga: any) => void = (key, asyncSaga) => {
  asyncSagas.push(asyncSaga());
  if (!asyncSagasReg[key]) {
    sagaTask = sagaMiddleware.run(createSaga(asyncSagas));
    asyncSagasReg[key] = key;
  }
}

export type RootStateType = ReturnType<typeof store.getState>;
const RootState = store.getState;

export type AppDispatchType = typeof store.dispatch;
const AppDispatch: Dispatch<any> = store.dispatch;

export {
  RootState,
  AppDispatch,
};
export default store;
