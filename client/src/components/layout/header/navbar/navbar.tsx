import React from "react";
import {NavLink} from "react-router-dom";
import "@/resources/styles/navbar.less";

type navbarProps = {
  data: {[key: number]: any};
};

const Navbar = (props: navbarProps) => {

  const setChildren = (items: any[]) => {

    if (typeof items === "undefined") return "";

    return (
      <ul className="navbar-vertical">
        {
          Object.keys(items).map((id) => {
            if (!items[id]["target"]) {
              return (
                <li key={id} className="navbar-vertical__item">
                  <a href={items[id]["link"]} className="navbar-vertical__item__link ">
                    {items[id]["name"]}
                  </a>
                </li>
              )
            } else {
              return (
                <li key={id} className="navbar-vertical__item">
                  <NavLink key={items[id]["id"]} to={items[id]["link"]} className="navbar-vertical__item__link ">
                    {items[id]["name"]}
                  </NavLink>
                </li>
              )
            }
          })
        }
      </ul>
    )
  }


  if (!props.data) return;

  return (
    <div className="navbar__wrap">

      <ul className="navbar-horizontal">
        {Object.keys(props.data).map((id) => {
          let item = props.data[id]

          if (!item["target"]) {
            return (
              <li key={item.id} className="navbar-horizontal__item">
                <a
                  key={item.id}
                  className="navbar-horizontal__item navbar-horizontal__item__link"
                  href={item.link}
                >
                  {item.name}
                  {item.children &&
                    <span>arr</span>
                    // <KeyboardArrowDownIcon style={{fontSize: "16px"}}/>
                  }
                </a>
                {setChildren(item.children)}
              </li>
            )
          } else {
            return (
              <li key={item.id} className="navbar-horizontal__item">
                <NavLink
                  key={item.id}
                  className="navbar-horizontal__item navbar-horizontal__item__link"
                  to={item.link}
                >
                  {item.name}
                  {item.children &&
                    <span>arr</span>
                    // <KeyboardArrowDownIcon style={{fontSize: "16px"}}/>
                  }
                </NavLink>
                {setChildren(item.children)}
              </li>
            )
          }
        })}
      </ul>
    </div>
  )

}

export default Navbar