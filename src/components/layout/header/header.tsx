import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
// import Profile from "./profile";
// import TopBarIcons from "./top-bar-icons";
import Navbar from "./navbar";
import TreeMapper from "@app/collections/TreeMapper";
import Api from "@api";
import Logo from "../../../resources/svg/logo.svg";
import {useAppSelector} from "@app/hooks/hooks";

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
          <img style={{width: "36px"}} src={Logo}/>
        </NavLink>
        {auth.isAuth &&
          <Navbar data={menuTree}/>
        }
        {/*{auth.isAuth &&*/}
        {/*  <TopBarIcons/>*/}
        {/*}*/}
        {/*<Profile perms={perms} auth={props.auth}/>*/}

      </div>
    </header>
  )

}

export default Header;
