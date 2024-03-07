import React, {useState} from "react";
import ProfileMenu from "./profile-menu";
import {AuthUserType} from "@app/auth/types";
import {NavLink} from "react-router-dom";

type ProfileType = {
  isAuth: boolean;
  user: AuthUserType;
};

const Profile = (props: ProfileType) => {

  const [isMenuOpen, toggleMenu] = useState(false);

  const openPanel = (event: React.MouseEvent<HTMLDivElement>) => {
    const isOpen = isMenuOpen ? false : true;
    toggleMenu(isOpen);
  }

  return (
    <div className="header-panel__profile" onClick={openPanel}>

      <div className="header-panel__profile__info">
        <span>{props.user.name}</span>
        <span className="header-panel__profile__info__alias">
          {props.user.account_alias}
        </span>
      </div>

      <div className="header-panel__profile__photo" style={{backgroundImage: `url(${props.user.avatar})`}}>
      </div>

      <ProfileMenu isMenuOpen={isMenuOpen} {...props}/>

    </div>
  );
};

export default Profile;
