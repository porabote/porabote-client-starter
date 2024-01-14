import * as React from "react";
import {NavLink} from "react-router-dom";
import GroupIcon from "@/app/ui/icons/base/GroupIcon";
import modal from "@/app/modal";
import Contacts from "@/components/users/contacts";
import Icon from "@app/ui/icons";

const TopBarIcons = () => {

  const openContacts = () => {
    modal.open(
      <Contacts title={`Контакты сотрудников`}/>,
    );
  };

  return (
    <div className="header-panel__top-bar-icons">
      <NavLink to="/users/contacts/">
        <Icon className="header-panel__top-bar-icons__contacts">
          <GroupIcon/>
        </Icon>
      </NavLink>
    </div>
  );
};

export default TopBarIcons;
