import React, {useContext, useEffect} from 'react';
import './assets/balloon.less'
import {BalloonPropsType} from "./types";
import BalloonMassage from "@app/balloon/balloon-massage";
import {BalloonContext} from "@app/balloon/balloon-wrapper";

const Balloon = (props: BalloonPropsType) => {

  let {msgs} = useContext(BalloonContext);

  return (
    <div className="porabote-balloon">
      {msgs.map((msg, index) => {
        return <BalloonMassage title={msg.title} key={msg.unique} unique={msg.unique} type={msg.type}/>;
      })}
    </div>
  );
};

export default Balloon;