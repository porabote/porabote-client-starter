import React, {createContext, useEffect, useState} from 'react';
import {contentType} from "./types";


type AuthPropsType = {
  children: React.ReactNode;
};

const initialAuth = {
  isOpen: false,
  activeTabKey: 0,
  tabs: [],
  closeModal: () => {console.log(close);},
  openModal: () => {console.log(open);},
};

export const ModalContext = createContext(initialAuth);

const ModalWrapper = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState(0);

  useEffect(() => {

  }, [isOpen]);

  const close = () => {
    setTabs([]);
    setIsOpen(false);
  }

  const open = (content: contentType) => {
    setTabs([
      ...tabs,
      content,
    ]);
    setIsOpen(true);
  }

  const setActiveTabKeyHandler = (keyId) => {
    setActiveTabKey(keyId);
  }

  return (
    <ModalContext.Provider value={{
      isOpen,
      activeTabKey,
      tabs,
      setActiveTab: setActiveTabKeyHandler,
      closeModal: close,
      openModal: open,
    }}>
      {props.children}
    </ModalContext.Provider>
  );

}

export default ModalWrapper;