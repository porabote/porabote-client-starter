import React, {useState} from "react";
import ProfileMenu from "./profile-menu";
import {AuthType} from "@app/auth/types";

type ProfileType = {
  auth: AuthType;
  perms: number[];
};

const Profile = (props: ProfileType) => {
  const [isMenuOpen, toggleMenu] = useState(false);

  if (!props.auth.isAuth) {
    return <div className="header__panel__auth"></div>;
  }

  return (
    <div
      className="header-panel__profile"
      onClick={(event): void => {
        const isOpen = isMenuOpen ? false : true;
        toggleMenu(isOpen);
      }}
    >
      <a className="header-panel__profile__info" href="/users/profile">
        <span>{props.auth.user.name}</span>
        <span className="header-panel__profile__info__alias">
          {props.auth.user.account_alias}
        </span>
      </a>

      <div
        className="header-panel__profile__photo"
        style={{backgroundImage: `url(${props.auth.user.avatar})`}}></div>

      <ProfileMenu
        perms={props.perms}
        auth={props.auth}
        isMenuOpen={isMenuOpen}/>
    </div>
  );
};

export default Profile;
