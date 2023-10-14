import {FC} from "react";
import store from '@/store';
import {
  CLOSE_MODAL,
  PUSH_MODAL_ITEM,
  REMOVE_MODAL_ITEM,
  SET_ACTIVE_ITEM,
} from "./types";

export const open = (content: FC): {type: string, payload: any} => {
  return store.dispatch({
    type: PUSH_MODAL_ITEM,
    payload: {content},
  });
}

export const pushItemToModal = (content: FC): {type: string, payload: any} => {
  return store.dispatch({
    type: PUSH_MODAL_ITEM,
    payload: {content},
  });
}

export const removeModalItem = (tabKey: number) => {

  return store.dispatch({
    type: REMOVE_MODAL_ITEM,
    payload: {tabKey},
  });
}

export const setActiveItem = (tabKey: number) => {
  return store.dispatch({
    type: SET_ACTIVE_ITEM,
    payload: {tabKey},
  });
}

export const closeModal = () => {
  return store.dispatch({
    type: CLOSE_MODAL,
  });
}

const Actions = () => {
  return ({
    open,
    pushItemToModal,
    removeModalItem,
    setActiveItem,
    closeModal,
  });
}

export default Actions();
