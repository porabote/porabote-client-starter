import {createStore, compose, applyMiddleware, Dispatch} from "redux";
import { configureStore } from '@reduxjs/toolkit'
import {createSaga, sagaMiddleware, thunkMiddleware} from "./middlewares";
import createReducer from "./root-reducer";


const store = configureStore({
    reducer: createReducer(),
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)

    //   compose(
    //     applyMiddleware(
    //   thunkMiddleware,
    //   sagaMiddleware,
    // )
});




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

export type RootState = ReturnType<typeof store.getState>;
//const RootState = store.getState;

export type AppDispatch = typeof store.dispatch;
// const AppDispatch: Dispatch<any> = store.dispatch;

// export {
//   RootState,
//   AppDispatch,
// };
export default store;
