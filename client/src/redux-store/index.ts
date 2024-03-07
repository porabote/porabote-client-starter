import Store, {rootRecucer, registrationReducer, registrationSaga} from "./store";
import store from "./store";

type RootStateType = ReturnType<typeof rootRecucer>;
type AppDispatchType = typeof store.dispatch;

export {
  RootStateType,
  AppDispatchType,
  registrationReducer,
  registrationSaga,
};

export default Store;
