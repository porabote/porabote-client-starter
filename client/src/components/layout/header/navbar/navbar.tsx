import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import "@/resources/styles/navbar.less";
import {NavBarLinkType, NavbarProps} from "./types";
import {NavsContext} from "@/app/navs-wrapper/navs-wrapper";
import ArrowDownIcon from "@/app/ui/icons/header-navs/arrow-down-icon";
import Icon from "@/app/ui/icons";
import NavbarItem from "@/components/layout/header/navbar/navbar-item";

const Navbar = (props: NavbarProps) => {

  const {navs} = useContext(NavsContext);

  return (
    <div className="navbar-top">

      <div className="navbar-top">
        {navs.map((nav, index) => {
          return <NavbarItem key={index} data={nav}/>
        })}
      </div>
    </div>
  )

}

export default Navbar