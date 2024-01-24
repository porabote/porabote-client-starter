import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Navbar from "./navbar";
import TreeMapper from "@app/collections/TreeMapper";
import Api from "@/services";
import Logo from "@/resources/svg/logo.svg";
import {useAppSelector} from "@app/hooks/hooks";
import TopBarIcons from "@/components/layout/header/top-bar-icons";
import Profile from "@/components/layout/header/profile";
import Icon from "@app/ui/icons";

type authProps = {
  isAuth: boolean;
};

const Header = () => {

  const auth: authProps = useAppSelector(state => state.auth);

  const [menuTree, setMenuTree] = useState({});
  const [perms, setPerms] = useState({
    isCanViewUsers: false,
    isCanViewBusinessEvents: false,
    isCanViewConfigs: false,
  });

  useEffect(() => {

    if (!auth.isAuth) return;

    Api.get(`/api/menus/method/getByAcl`, {}).then((data) => {
      setMenuTree(TreeMapper.buildNestedList(data.data.menu));
      setPerms(data.data.perms);
    });

  });

  const bgColor = (auth.isAuth) ? "#fff" : ""

  return (
    <header style={{"background": bgColor}}>
      <div className="header-panel">

        <NavLink className="header-panel__logo" to={"/"}>
          {auth.isAuth &&
            <img style={{width: "110px"}} src={Logo}/>
          }
        </NavLink>
        {auth.isAuth &&
          <Navbar data={menuTree}/>
        }
        {auth.isAuth &&
          <TopBarIcons/>
        }
        {/*<Profile perms={perms} auth={auth}/>*/}

      </div>
    </header>
  )

}

export default Header;
