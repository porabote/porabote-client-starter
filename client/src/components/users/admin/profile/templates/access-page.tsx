import React, {useContext, useEffect, useState} from 'react';
import ApiService from "@/services/api-service";
import {SettingsContext} from "@app/settings/settings";
import {Checkbox} from "@app/form";
import {useParams} from "react-router";

const AccessPage = (props) => {

  let { id } = useParams();

  const [navs, setNavs] = useState([]);
  const {lang} = useContext(SettingsContext);

  console.log(props.data.aro.permissions);

  useEffect(() => {
    getNavs();
  }, []);


  const getNavs = async () => {
    const navs = await ApiService.get("/navs/action/getTree");
    setNavs(navs.data);
  }

  const onChangeHandler = async (e,nav) => {
    const res = await ApiService.post("/users/action/setPermission", {
      aco_id: nav.aco_id,
      user_id: id,
      status: e.target.checked ? 1 : 0,
    });
  }

  return (
    <div>

      <h3>Права пользователя на разделы</h3>

      <div>
        {navs.map(nav => {

          return (
            <div className="admin_user_access_list" key={nav.id}>
              <div className="admin_user_access_list_nav_root">
                <Checkbox label={nav[`title_${lang}`]}/>
                {nav.children.map((child_nav) => {
                  return(
                    <div className="admin_user_access_list_nav_child" key={child_nav.id}>
                      <Checkbox onChange={(e) => onChangeHandler(e, child_nav)} label={child_nav[`title_${lang}`]}/>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessPage;