import React, {useEffect, useState, useContext} from "react";
import {NavLink} from "react-router-dom";
import Navbar from "./navbar";
import TreeMapper from "@app/collections/TreeMapper";
import Api from "@/services";
import Logo from "@/resources/svg/logo.svg";
import TopBarIcons from "@/components/layout/header/top-bar-icons";
import Profile from "@/components/layout/header/profile";
import {AuthContext} from "@app/auth-wrapper";

const Header = () => {

  const {isAuth, user} = useContext(AuthContext);

  const [menuTree, setMenuTree] = useState({});
  const [perms, setPerms] = useState({
    isCanViewUsers: false,
    isCanViewBusinessEvents: false,
    isCanViewConfigs: false,
  });

  useEffect(() => {

    if (!isAuth) return;
    getMenuList();
  }, []);

  const getMenuList = () => {
    Api.get(`/navs/get`, {}).then((data) => {
      setMenuTree(TreeMapper.buildNestedList(data.data.menu));
      setPerms(data.data.perms);
    });
  }

  const bgColor = (isAuth) ? "#fff" : "";

  return (
    <header style={{"background": bgColor}}>
      <div className="header-panel">

        {isAuth &&
          <React.Fragment>
            {/*<NavLink className="header-panel__logo" to={"/"}>*/}
            {/*  <img style={{width: "90px"}} src={Logo}/>*/}
            {/*</NavLink>*/}
            <Navbar data={menuTree}/>
            <TopBarIcons/>
          </React.Fragment>
        }
        <Profile isAuth={isAuth} user={user}/>

      </div>
    </header>
  )

}

export default Header;
