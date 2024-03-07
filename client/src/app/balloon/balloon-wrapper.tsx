import React, {createContext, useEffect, useState} from 'react';
import Balloon from "@app/balloon/balloon";
import {BalloonMessageType} from "@app/balloon/types";

const initValues = {
  msgs: [],
  closeMsg: (unique: number) => {}
};

export const BalloonContext = createContext(initValues);

const AuthWrapper = (props: { children: React.ReactNode }) => {

  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    //pushMsg();
  }, [msgs]);

  const showMsg = (title: string, type = 'notice') => {
    setMsgs([
      ...msgs,
      {title, type, unique: Math.floor(Math.random() * 1000000)},
    ])
  }

  const closeMsg = (key: number) => {

    let msgsNew = msgs.filter((item: BalloonMessageType) => {
      console.log(item.unique, key);
      return item.unique === key ? false : true;
    });
console.log(msgsNew);
    setMsgs([...msgsNew]);
  }

  return (
    <BalloonContext.Provider value={{msgs, showMsg, closeMsg}}>
      <>
        {props.children}
        <Balloon msgs={msgs} key="balloon"/>
      </>
    </BalloonContext.Provider>
  );
};

export default AuthWrapper;