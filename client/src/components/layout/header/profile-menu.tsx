import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import LogoutIcon from "@/app/ui/icons/header-profile/LogoutIcon";
import Icon, {UserIcon} from "@app/ui/icons";
import ProfileIcon from "@app/ui/icons/header-profile/ProfileIcon";
import AccessListIcon from "@app/ui/icons/header-profile/AccessListIcon";
import ConfigIcon from "@app/ui/icons/header-profile/ConfigIcon";
import {AuthContext} from "@/app/auth-wrapper";
import {AuthUserType} from "@/app/auth-wrapper/types";

type ProfileType = {
  isAuth: boolean;
  user: AuthUserType;
  isMenuOpen: boolean;
};

const ProfileMenu = (props: ProfileType) => {

  const {signOut} = useContext(AuthContext);
  const navigate = useNavigate();
  const {user} = props;

  const signOutHandler = () => {
    const callback = () => {
      navigate("/auth/signIn");
    }
    signOut(callback);
  };

  const settingStyle = {
    color: "#444",
    marginRight: "12px",
    fontSize: "18px",
  };

  return (
    <div className={props.isMenuOpen ? "header-panel__profile__dropdown open" : "header-panel__profile__dropdown"}>

      <div className="header-panel__profile__dropdown__item">
        <Icon size={18}>
          <ProfileIcon/>
        </Icon>
        <NavLink to={`/users/view/${user.id}`}>
          Профиль
        </NavLink>
      </div>


      {/*<div className="header-panel__profile__dropdown__item">*/}
      {/*  <SettingsEthernetIcon style={settingStyle}/>*/}
      {/*  <NavLink to="/business-events/feed/" className="header-panel__profile__dropdown__item__divnk profil">*/}
      {/*    Бизнес-события*/}
      {/*  </NavLink>*/}
      {/*</div>*/}

      <div className="header-panel__profile__dropdown__item">
        <Icon><AccessListIcon/></Icon>
        <NavLink to="/access-lists/feed/" className="header-panel__profile__dropdown__item__divnk profil">
          Списки доступа
        </NavLink>
      </div>

      {/*<div className="header-panel__profile__dropdown__item">*/}
      {/*  <SettingsEthernetIcon style={settingStyle}/>*/}
      {/*  <NavLink to="/mails-patterns/feed/" className="header-panel__profile__dropdown__item__divnk profil">*/}
      {/*    Шаблоны писем*/}
      {/*  </NavLink>*/}
      {/*</div>*/}


      <div className="header-panel__profile__dropdown__item">
        <Icon><ConfigIcon/></Icon>
        <NavLink to="/settings/" className="header-panel__profile__dropdown__item__divnk profil">
          Настройки
        </NavLink>
      </div>


      {user.is_su &&
        <div className="header-panel__profile__dropdown__item">
          <Icon><ProfileIcon/></Icon>
          <NavLink to="/admin/users" className="header-panel__profile__dropdown__item__divnk profil">
            Пользователи
          </NavLink>
        </div>
      }


      <div className="header-panel__profile__dropdown__separator"></div>
      <div className="header-panel__profile__dropdown__item ">
        <Icon size={18}>
          <LogoutIcon/>
        </Icon>
        <div onClick={signOutHandler} className="header-panel__profile__dropdown__item__divnk exit">
          Выйти
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
