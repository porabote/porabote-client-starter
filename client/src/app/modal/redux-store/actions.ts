import {FC, Component, ReactElement} from "react";
import {
  CLOSE_MODAL,
  PUSH_MODAL_ITEM,
  REMOVE_MODAL_ITEM,
  SET_ACTIVE_ITEM,
} from "./types";

type contentType = (FC | Component | Element | ReactElement);

export const openAction: (dispatch, content: contentType) => any = (dispatch, content: contentType): any => {
  dispatch({
    type: PUSH_MODAL_ITEM,
    payload: {content},
  });
}

export const closeAction = (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
}

export const removeModalItem = (dispatch, tabKey: number) => {
  dispatch({
    type: REMOVE_MODAL_ITEM,
    payload: {tabKey},
  });
}

export const setActiveItem = (dispatch, tabKey: number) => {
  dispatch({
    type: SET_ACTIVE_ITEM,
    payload: {tabKey},
  });
}
