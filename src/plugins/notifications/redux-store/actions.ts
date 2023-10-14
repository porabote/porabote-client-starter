import {FC} from "react";
import store from '@/store';
import {
  PUSH_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "./types";

export interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

export const push = (element: FC, msgType?: string ) => {

  msgType = msgType || 'OK';

  const action = {
    type: PUSH_NOTIFICATION,
    payload: {
      element,
      msgType
    },
  };

  return store.dispatch(action);
}

export const remove = (index: number) => {
  return store.dispatch({
    type: REMOVE_NOTIFICATION,
    payload: {index},
  });
}

const Actions = () => {
  return ({
    push,
    remove,
  });
}

export default Actions();
