import React, {useContext, useEffect, useState} from 'react';
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import {Cell, Row, Table} from "@/app/ui/table";
import moment from "moment";
import SearchInput from "@/app/ui/search-input";
import Icon, {PlusIcon} from "@/app/ui/icons";
import {ModalContext} from "@/app/modal/modal-wrapper";
import Add from "../../modals/add";
import {SettingsContext} from "@/app/settings/settings";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import FeedFilter from "@/components/checkins/feed/templates/feed-filter";
import {NavLink} from "react-router-dom";

const FeedView = () => {

  const {records} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  // const openAddModal = () => {
  //   openModal(<Add title="Добавить"/>);
  // }

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">
        <div className="feed_page__title">
          <h2>Чекины</h2>
        </div>

        {/*<div className="feed_page__plus" onClick={openAddModal}>*/}
        {/*  <Icon size="12">*/}
        {/*    <PlusIcon/>*/}
        {/*  </Icon>*/}
        {/*  Добавить*/}
        {/*</div>*/}
      </div>

      <FeedFilter/>

      {!records.length && "Загрузка данных"}

      <Greed records={records} class="feed striped">
        <GreedColumn label={{en: 'ID', ru: 'ID'}} name="id" dataKey="id" width="100px"/>
        <GreedColumn
          name="level"
          width="120px"
          render={(record) => record.guest && record.guest.level && record.guest.level.title}
          label={{ru: "Уровень трат", en: "Spanding level"}}/>
        <GreedColumn
          name="phone"
          width="120px"
          dataKey="guest.phone"
          label={{ru: "Телефон", en: "Phone"}}/>
        <GreedColumn
          name="friends_count"
          dataKey="friends_count"
          width="120px"
          label={{ru: "Друзей", en: "Friends"}}/>
        <GreedColumn
          name="created_at"
          render={(record) => <div><b>{moment(record.created_at).format("DD-MM-YYYY HH:mm")}</b></div>}
          width="180px"
          label={{ru: "Время чекина", en: "Checkin's time"}}/>
        <GreedColumn
          name="club"
          render={(record) => record.club && record.club[`name_${lang}`]}
          width="1fr"
          label={{ru: "Клуб", en: "Club"}}/>
        <GreedColumn
          name="guest"
          render={(record) => record.guest && <div><NavLink to={`/guests/profile/${record.guest.id}`}><b>{record.guest.name}</b></NavLink> <br/> {record.guest.phone}</div>}
          width="1fr"
          label={{ru: "Гость", en: "Guest"}}/>
      </Greed>

    </div>
  );
};

export default FeedView;