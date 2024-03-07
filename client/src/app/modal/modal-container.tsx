import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {closeAction} from "./redux-store/actions";
import ModalTab from './modal-tab';
import ModalItem from './modal-item';
import {contentType, modalStateProps} from "./types";
import './assets/style.less';

const ModalContainer = () => {

  const dispatch = useDispatch();

  let modalState: modalStateProps = useSelector(((state: {modal: modalStateProps}) => state.modal));

  return (
    <div
      className={modalState.isOpen ? "modal active" : "modal"}
      onClick={() => {
        closeAction(dispatch);
      }}
    >
      <div
        className={modalState.isOpen ? "modal-box-wrap active" : "modal-box-wrap"}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div id="modal-tabs">
          {modalState.items.map((item, index) => {
            return <ModalTab
              title={item.content.props.title}
              activeItemKey={modalState.activeItemKey}
              itemkey={index}
              key={index}
            />
          })}
        </div>

        {modalState.items.map((item, index) => {
          return <ModalItem
            activeItemKey={modalState.activeItemKey}
            title={item.content.props.title}
            content={item.content}
            itemkey={index}
            key={index}
          />
        })}

      </div>
    </div>
  );

}

export default ModalContainer;
