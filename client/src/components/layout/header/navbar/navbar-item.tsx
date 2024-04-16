import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {NavBarLinkType} from "@app/navs-wrapper/types";
import Icon from "@app/ui/icons";
import ArrowDownIcon from "@app/ui/icons/header-navs/arrow-down-icon";
import {SettingsContext} from "@app/settings/settings";

const NavbarItem = (props) => {

  const {lang} = useContext(SettingsContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const onMouseEnterHandler = () => {
    setDropdownVisible(true);
  }

  const onMouseLeaveHandler = () => {
    setDropdownVisible(false);
  }

  const setChildren = (navs: NavBarLinkType[]) => {

    if (typeof navs === "undefined") return "";

    return (
      <div className={`navbar-top-sub ${isDropdownVisible ? 'active' : ''}`}>
        {
          navs.map((nav, index) => {
            return (
              <NavLink key={index} to={nav.link} className="navbar-top-sub_item">
                {nav[`title_${lang}`]}
              </NavLink>
            )
          })
        }
      </div>
    )
  }

  const nav = props.data;

  return (
    <div
      key={nav.id}
      className="navbar-top_item"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}>
      <NavLink key={nav.id} className="navbar-top_item-link" to={nav.link}>
        {nav[`title_${lang}`]}
        {nav.children &&
          <Icon size={10}><ArrowDownIcon/></Icon>
        }
      </NavLink>
      {setChildren(nav.children)}
    </div>
  );

};

export default NavbarItem;