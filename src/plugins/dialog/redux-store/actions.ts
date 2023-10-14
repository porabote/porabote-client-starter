import {FC} from "react";
import store from '@/store';
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from "./types";

export const open = (content: FC): {type: string, payload: any} => {
  return store.dispatch({
    type: OPEN_DIALOG,
    payload: {content},
  });
}

export const close = () => {
  return store.dispatch({
    type: CLOSE_DIALOG,
  });
}

const Actions = () => {
  return ({
    open,
    close,
  });
}

export default Actions();
