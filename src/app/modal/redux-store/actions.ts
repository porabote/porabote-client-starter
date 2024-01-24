import {FC, Component, ReactElement} from "react";
import {
  CLOSE_MODAL,
  PUSH_MODAL_ITEM,
  REMOVE_MODAL_ITEM,
  SET_ACTIVE_ITEM,
} from "./types";

type contentType = (FC | Component | Element | ReactElement);

export const openAction: (content: contentType) => any = (content: contentType): any => {
  return {
    type: PUSH_MODAL_ITEM,
    payload: {content},
  };
}

export const closeAction = () => {
  return {
    type: CLOSE_MODAL,
  };
}

export const removeModalItem = (tabKey: number) => {
  return {
    type: REMOVE_MODAL_ITEM,
    payload: {tabKey},
  };
}

export const setActiveItem = (tabKey: number) => {
  return {
    type: SET_ACTIVE_ITEM,
    payload: {tabKey},
  };
}
