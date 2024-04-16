import * as React from 'react';
import ModalTab from './modal-tab';
import ModalItem from './modal-item';
import {useContext} from "react";
import {ModalContext} from "./modal-wrapper";
import './assets/style.less';

const ModalContainer = () => {

  const {isOpen, tabs, closeModal, openModal, activeTabKey} = useContext(ModalContext);

  return (
    <div
      className={isOpen ? "modal active" : "modal"}
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className={isOpen ? "modal-box-wrap active" : "modal-box-wrap"}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div id="modal-tabs">
          {tabs.map((tab, index) => {

            let title = tab.props.title ? tab.props.title : "";

            return <ModalTab
              title={title}
              activeItemKey={activeTabKey}
              itemkey={index}
              key={index}
            />
          })}
        </div>

        {tabs.map((tab, index) => {

          return <ModalItem
            activeItemKey={activeTabKey}
            content={tab}
            itemkey={index}
            key={index}
          />
        })}

      </div>
    </div>
  );

}

export default ModalContainer;
