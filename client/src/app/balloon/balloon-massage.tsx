import React, {useContext, useEffect} from 'react';
import {BalloonMessageType} from "@app/balloon/types";
import Icon, {CloseIcon} from "@app/ui/icons";
import {BalloonContext} from "@app/balloon/balloon-wrapper";

const BalloonMassage = (props: BalloonMessageType) => {

  const {closeMsg} = useContext(BalloonContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeMsg(props.unique);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  const closeMsgHandler = () => {
    closeMsg(props.unique);
  }

  return (
    <div className="porabote-balloon_msg">
      <div className="porabote-balloon_msg__title">
        {props.title}
      </div>
      <div className="porabote-balloon_msg__close" onClick={closeMsgHandler}>
        <Icon size={15} fill="rgba(85, 85, 98, 0.4)" fillHover="#333">
          <CloseIcon/>
        </Icon>
      </div>
    </div>
  );
}

export default BalloonMassage;