import React from "react";
import {useDispatch} from "react-redux";
import {contentType} from "./types";
import {closeAction, openAction} from "./redux-store/actions";

const ModalActions = () => {

  const dispatch = useDispatch();

  const open = (content: contentType, ) => {
    dispatch(openAction(content));
  }

  const close = () => {
    dispatch(closeAction());
  }

}

export default new ModalActions;