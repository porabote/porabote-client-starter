import {createStore, compose, applyMiddleware} from "redux";
import {createSaga, sagaMiddleware, thunkMiddleware} from "./middlewares";
import createReducer from "./root-reducer";
//import __SagaTaskRegistry from "./SagaTaskRegistry";

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

//const sagaTaskRegistry = new __SagaTaskRegistry();
let sagaTask = sagaMiddleware.run(createSaga(asyncSagas));

export let registrationReducer: (key: string, asyncReducer: any) => void = (key, asyncReducer) => {
  asyncReducers[key] = asyncReducer
  store.replaceReducer(createReducer(asyncReducers))
}

export let registrationSaga: (key: string, asyncSaga: any) => void = (key, asyncSaga) => {
  asyncSagas.push(asyncSaga());
  if (!asyncSagasReg[key]) {
    sagaTask = sagaMiddleware.run(createSaga(asyncSagas));
    asyncSagasReg[key] = key;
  }
}

// Infer the `RootState` and `AppDispatch` types from the redux-store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
