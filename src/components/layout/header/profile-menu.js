import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";

const ProfileMenu = (props) => {

  const { user } = useSelector(state => state.auth);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("porabote_user");
    window.location = "/users/logout/";
  };

  const settingStyle = {
    color: "#444",
    marginRight: "12px",
    fontSize: "18px"
  };

  return (
    <div
      className={props.isMenuOpen ? "header-panel__profile__dropdown open" : "header-panel__profile__dropdown"}>

      <div className="header-panel__profile__dropdown__item">
        <PersonIcon style={settingStyle}/>
        <NavLink to={`/users/view/${user.id}`}
                 className="header-panel__profile__dropdown__item__divnk profil"> Профиль</NavLink>
      </div>

      <React.Fragment>
        {props.perms.isCanViewBusinessEvents &&
          <>
            <div className="header-panel__profile__dropdown__item">
              <SettingsEthernetIcon style={settingStyle}/>
              <NavLink to="/business-events/feed/"
                       className="header-panel__profile__dropdown__item__divnk profil">Бизнес-события</NavLink>
            </div>

            <div className="header-panel__profile__dropdown__item">
              <SettingsEthernetIcon style={settingStyle}/>
              <NavLink to="/access-lists/feed/"
                       className="header-panel__profile__dropdown__item__divnk profil">Списки доступа</NavLink>
            </div>

            <div className="header-panel__profile__dropdown__item">
              <SettingsEthernetIcon style={settingStyle}/>
              <NavLink to="/mails-patterns/feed/ "
                       className="header-panel__profile__dropdown__item__divnk profil">Шаблоны писем</NavLink>
            </div>
          </>
        }
        {props.perms.isCanViewConfigs &&

          <div className="header-panel__profile__dropdown__item">
            <SettingsIcon style={settingStyle}/>
            <a href="/configs/"
               className="header-panel__profile__dropdown__item__divnk profil"> Конфигурация</a>
          </div>
        }

        {props.perms.isCanViewUsers &&
          <div className="header-panel__profile__dropdown__item">
            <GroupIcon style={settingStyle}/>
            <a href="/porabote/users/feed/"
               className="header-panel__profile__dropdown__item__divnk profil"> Пользователи</a>
          </div>
        }
      </React.Fragment>


      <div className="header-panel__profile__dropdown__separator"></div>
      <div className="header-panel__profile__dropdown__item ">
        <ExitToAppIcon style={{
          color: "#444",
          marginRight: "12px",
          fontSize: "18px"
        }}/>
        <span onClick={logout}
              className="header-panel__profile__dropdown__item__divnk exit">Выход</span>
      </div>

    </div>
  );
};

export default ProfileMenu;
