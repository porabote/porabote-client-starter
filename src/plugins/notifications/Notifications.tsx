import React from 'react';
import {useAppSelector} from "../../app/hooks/hooks";
import NotificationsItem from "./NotificationsItem";
import "./Notifications.less";
import {registrationReducer} from "../../store";
import reducer from "./redux-store/reducer";

const Notifications = () => {

  registrationReducer("notifications", reducer);

  const store = useAppSelector(state => state.notifications);

  return (
    <div className="notifications">
      <div className="notifications-items">
        {store.items.map((item, index) => {
          return React.createElement(NotificationsItem, {
            ...item,
            itemKey: index,
            key: index,
          })
        })}

      </div>
    </div>
  );
};

export default Notifications;
