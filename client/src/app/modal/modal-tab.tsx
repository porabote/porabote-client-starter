import React from 'react'
import {closeAction, setActiveItem} from "./redux-store/actions";
import {useDispatch} from "react-redux";

export type modalTabProps = {
  itemkey: number;
  activeItemKey: number;
  title: string;
};

const ModalTab = (props: modalTabProps) => {

  const dispatch = useDispatch();

  return (
    <div className={props.activeItemKey == props.itemkey ? "modal-tabs-item active" : "modal-tabs-item"}>
          <span
            className="modal-tabs-item__link"
            onClick={() => setActiveItem(dispatch, props.itemkey)}
          >
            {props.title}
          </span>
      <span
        className="modal-tabs-item__close modal-close"
        item-key={props.itemkey}
        onClick={() => {
          closeAction(dispatch)
        }}
      >
        </span>
    </div>
  );
}

export default ModalTab;
