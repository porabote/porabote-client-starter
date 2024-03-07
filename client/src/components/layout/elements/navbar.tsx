import React from 'react';
import Icon from "@/app/ui/icons";
import BarsIcon from "@/app/ui/icons/base/BarsIcon";
import HrIcon from "@/app/ui/navigation/HrIcon";
import HeartIcon from "@/app/ui/navigation/HeartIcon";
import MediaIcon from "@/app/ui/navigation/MediaIcon";
import ClubIcon from "@/app/ui/navigation/ClubIcon";
import StatIcon from "@/app/ui/navigation/StatIcon";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-left">

      <div className="navbar-left_bars-icon">
        <Icon fill="#6F7595" size={26} fillHover="#000">
          <BarsIcon/>
        </Icon>
      </div>

      <div className="navbar-left_panel">
        <div className="navbar-left_panel__item">
          <Icon size={20} fill="#3D3D3D" fillHover="#101326FF">
            <HrIcon/>
          </Icon> HR
        </div>
        <div className="navbar-left_panel__item">
          <Icon size={20} fill="#3D3D3D" fillHover="#101326FF">
            <HeartIcon/>
          </Icon> Лента
        </div>
        <div className="navbar-left_panel__item">
          <Icon size={20} fill="#28303F" fillHover="#101326FF">
            <MediaIcon/>
          </Icon> AD
        </div>
        <div className="navbar-left_panel__item">
          <Icon size={20} fill="#3D3D3D" fillHover="#101326FF">
            <ClubIcon/>
          </Icon> Passmen
        </div>
        <div className="navbar-left_panel__item">
          <NavLink to="/stats/yandex">
            <Icon size={20} fill="#3D3D3D" fillHover="#101326FF">
              <StatIcon/>
            </Icon> Статис..
          </NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;