import React, {useContext} from 'react';
import {BalloonMessageType} from "@app/balloon/types";
import Icon, {CloseIcon} from "@app/ui/icons";
import {BalloonContext} from "@app/balloon/balloon-wrapper";

const BalloonMassage = (props: BalloonMessageType) => {

  const {closeMsg} = useContext(BalloonContext);

  const closeMsgHandler = () => {
    closeMsg(props.unique);
  }

  return (
    <div className="porabote-balloon_msg">
      <div className="porabote-balloon_msg__title">
        {props.title}
      </div>
      <div className="porabote-balloon_msg__close" onClick={closeMsgHandler}>
        <Icon size={12} fill="#FFFFFF">
          <CloseIcon/>
        </Icon>
      </div>
    </div>
  );
}

export default BalloonMassage;