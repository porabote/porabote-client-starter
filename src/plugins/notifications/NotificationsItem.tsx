import React, {useEffect} from 'react';
import Icon, {CloseIcon} from "../../components/common/ui/icons";
import {remove} from "./redux-store/actions";

const NotificationsItem = (props) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      remove(props.itemKey);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="notifications-items-item">
      <div className="notifications-items-item-icon">
      </div>
      <div className="notifications-items-item-text">
        {props.msg}
      </div>
      <div className="notifications-items-item-remove">
        <Icon
          fill="#999"
          onClick={(e) => {
            console.log(props);
            remove(props.itemKey);
          }}
        >
          <CloseIcon/>
        </Icon>
      </div>
    </div>
  );
};

export default NotificationsItem;
