import React, {useContext, useState} from "react";
import ProfileMenu from "./profile-menu";
import {AuthUserType} from "@/app/auth-wrapper/types";
import {NavLink} from "react-router-dom";
import {AuthContext} from "@/app/auth-wrapper";

type ProfileType = {
  isAuth: boolean;
  user: AuthUserType;
};

const Profile = (props: ProfileType) => {

  const {user} = useContext(AuthContext);
  const [isMenuOpen, toggleMenu] = useState(false);

  const openPanel = (event: React.MouseEvent<HTMLDivElement>) => {
    const isOpen = isMenuOpen ? false : true;
    toggleMenu(isOpen);
  }

  return (
    <div className="header-panel__profile" onClick={openPanel}>

      <div className="header-panel__profile__info">
        <span>{user.name}</span>
        <span className="header-panel__profile__info__alias">
          {user.account_alias}
        </span>
      </div>

      <div className="header-panel__profile__photo" style={{backgroundImage: `url(${user.avatar})`}}>
      </div>

      <ProfileMenu isMenuOpen={isMenuOpen} {...props}/>

    </div>
  );
};

export default Profile;
