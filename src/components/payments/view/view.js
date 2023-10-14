import React from "react";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import History from "@/app/components/history";
import Comments from "@/app/components/comments";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import RecordView from "./record-view";
import ScanCopies from "./scan-copies/scan-copies";
import Payments from "../models/Payments";

const View = (props) => {

  moment.lang("ru");
  const {data} = props;

  if (data.length == 0) {
    return <p>Запись не найдена</p>
  }

  return (
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "30px 0 10px 0", color: "#555"}}>
        <NavLink className="crumb_link" to="/payments/feed/">
          <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
          Назад к списку
        </NavLink>
        {data.attributes.description}
      </p>

      <Tabs {...props}>
        <TabList>
          <Tab>Данные</Tab>
          <Tab>Скан-копия счёта</Tab>
          <Tab>История</Tab>
          <Tab>Комментарии</Tab>
        </TabList>

        <TabPanel>
          <RecordView {...props}/>
        </TabPanel>
        <TabPanel>
          <ScanCopies {...props}/>
        </TabPanel>
        <TabPanel>
          <History where={{record_id: data.id, model_alias: "payments"}}/>
        </TabPanel>
        <TabPanel>
          <Comments model={Payments} where={{record_id: data.id, class_name: "Payments"}} />
        </TabPanel>
      </Tabs>

    </div>
  )
}

export default View;
