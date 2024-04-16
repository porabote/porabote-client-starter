import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from "@/app/tabs";
import Card from "./card";
import Payments from "./payments";
import Checkins from "./checkins";
import Gifts from "./gifts";
import Points from "./points";
import Orders from "./orders";
import Icon from "@/app/ui/icons";
import BackIcon from "@/app/ui/icons/record-page/BackIcon";
import {useNavigate} from "react-router-dom";

type PropsType = {
  record: any;
};

const ProfileView = (props: PropsType) => {

  if (!props.record) {
    return <div>Загрузка...</div>;
  }

  const navigate = useNavigate();

  const baskToList = () => {
    navigate("/guests");
  }

  const {record} = props;

  return (
    <div className="record_page">

      <div className="record_page_title">
        <div className="record_page_title_icon" onClick={baskToList}>
          <Icon>
            <BackIcon/>
          </Icon>
        </div>
        <h3>Гость: {record.name}</h3>
      </div>

      <Tabs {...props}>
        <TabList>
          <Tab>Данные</Tab>
          <Tab>Платежи</Tab>
          <Tab>Чекины</Tab>
          <Tab>Подарки</Tab>
          <Tab>ВУ</Tab>
          <Tab>Оферы</Tab>
        </TabList>

        <TabPanel>
          <Card data={record}/>
        </TabPanel>
        <TabPanel>
          <Payments data={record}/>
        </TabPanel>
        <TabPanel>
          <Checkins data={record}/>
        </TabPanel>
        <TabPanel>
          <Gifts data={record}/>
        </TabPanel>
        <TabPanel>
          <Points data={record}/>
        </TabPanel>
        <TabPanel>
          <Orders data={record}/>
        </TabPanel>
      </Tabs>

    </div>
  );
};

export default ProfileView;