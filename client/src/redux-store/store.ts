import {createStore, compose, applyMiddleware, Dispatch} from "redux";
import { configureStore } from '@reduxjs/toolkit'
import {createSaga, sagaMiddleware, thunkMiddleware} from "./middlewares";
import createReducer from "./root-reducer";

const rootRecucer = createReducer();

const store = configureStore({
    reducer: rootRecucer,
    middleware:(getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(sagaMiddleware);
        //.concat(thunkMiddleware)
    }
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

// type RootStateType = ReturnType<typeof rootRecucer>;
// //const RootState = store.getState;
//
// type AppDispatchType = typeof store.dispatch;
// const AppDispatch: Dispatch<any> = store.dispatch;

export {
  rootRecucer,
};
export default store;
