import {FC, Component, ReactElement} from "react";
import {AppDispatch} from '@/redux-store/store';
import {
  CLOSE_MODAL,
  PUSH_MODAL_ITEM,
  REMOVE_MODAL_ITEM,
  SET_ACTIVE_ITEM,
} from "./types";

export const open: (content: (FC | Component | Element | ReactElement)) => void = (content: FC | Component | Element | ReactElement): void => {
  AppDispatch({
    type: PUSH_MODAL_ITEM,
    payload: {content},
  });
}

export const pushItemToModal = (content: FC): void => {
  AppDispatch({
    type: PUSH_MODAL_ITEM,
    payload: {content},
  });
}

export const removeModalItem = (tabKey: number) => {
  AppDispatch({
    type: REMOVE_MODAL_ITEM,
    payload: {tabKey},
  });
}

export const setActiveItem = (tabKey: number) => {
  AppDispatch({
    type: SET_ACTIVE_ITEM,
    payload: {tabKey},
  });
}

export const closeModal = () => {
  AppDispatch({
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
