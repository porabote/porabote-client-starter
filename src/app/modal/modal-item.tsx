import * as React from "react";
import {removeModalItem} from "./redux-store/actions";
import {modalItemProps} from "./types";

const ModalItem = (props: modalItemProps) => {

  return (
    <div className={props.activeItemKey == props.itemkey ? "modal-tabs-block active" : "modal-tabs-block"}>
      <div className="modal-box">

        <div className="modal-box-up">
          <span>{props.title}</span>
        </div>

        <div className="modal-box-center">
          {React.cloneElement(props.content, {
            itemkey: props.itemkey,
            removeModalItem: removeModalItem,
          })}
        </div>

      </div>
    </div>
  );

}

export default ModalItem;
