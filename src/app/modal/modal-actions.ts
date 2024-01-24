import * as React from "react";
import {useAppDispatch} from "@/app/hooks/hooks";
import {contentType} from "./types";
import {closeAction, openAction} from "./redux-store/actions";

const ModalActions = () => {

  const dispatch = (test: any) => {};//useAppDispatch()

  const open = (content: contentType, ) => {
    dispatch(openAction(content));
  }

  const close = () => {
    dispatch(closeAction());
  }

  return 89;

}

export default ModalActions;