import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from "@/app/tabs";
import Icon from "@/app/ui/icons";
import BackIcon from "@/app/ui/icons/record-page/BackIcon";
import {useNavigate} from "react-router-dom";
import DetailsPage from "@/components/users/admin/profile/templates/details-page";
import AccessPage from "@/components/users/admin/profile/templates/access-page";
import AccountsPage from "@/components/users/admin/profile/templates/accounts-page";

type PropsType = {
  record: any;
};

const Page = (props: PropsType) => {

  const navigate = useNavigate();

  if (!props.record) {
    return <div>Загрузка...</div>;
  }

  const baskToList = () => {
    navigate("/admin/users");
  }

  const {record} = props;

  return (
    <div className="record_page">

      <div className="record_page_title">
        <div className="record_page_title_icon" onClick={baskToList}>
          <Icon size={12} fill="#444">
            <BackIcon/>
          </Icon>
        </div>
        Пользователь: {record.name}
      </div>

      <Tabs {...props}>
        <TabList>
          <Tab>Права доступа</Tab>
          <Tab>Данные</Tab>

          <Tab>Аккаунты</Tab>
        </TabList>

        <TabPanel>
          <AccessPage data={record}/>
        </TabPanel>
        <TabPanel>
          <DetailsPage data={record}/>
        </TabPanel>
        <TabPanel>
          <AccountsPage data={record}/>
        </TabPanel>
      </Tabs>

    </div>
  );
};

export default Page;