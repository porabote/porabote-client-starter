import React, {ReactElement, JSXElementConstructor} from 'react'
import {modalActions} from "./";

export type modalTabProps = {
  itemkey: number;
  activeItemKey: number;
  title: string;
};

const ModalTab = (props: modalTabProps) => {

  return (
    <div className={props.activeItemKey == props.itemkey ? "modal-tabs-item active" : "modal-tabs-item"}>
          <span
            className="modal-tabs-item__link"
            onClick={() => modalActions.setActiveItem(props.itemkey)}
          >
            {props.title}
          </span>
      <span
        className="modal-tabs-item__close modal-close"
        item-key={props.itemkey}
        onClick={() => {
          modalActions.removeModalItem(props.itemkey)
        }}
      >
        </span>
    </div>
  );
}

export default ModalTab;
