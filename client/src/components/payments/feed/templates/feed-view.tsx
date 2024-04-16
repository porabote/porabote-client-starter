import React, {useContext, useEffect, useState} from 'react';
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import {Cell, Row, Table} from "@/app/ui/table";
import moment from "moment";
import SearchInput from "@/app/ui/search-input";
import Icon, {PlusIcon} from "@/app/ui/icons";
import {ModalContext} from "@/app/modal/modal-wrapper";
import Add from "../../modals/add";
import {SettingsContext} from "@/app/settings/settings";

const FeedView = () => {

  const {records} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<Add title="Добавить"/>);
  }

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">
        <div className="feed_page__title">
          <h2>Платежи</h2>
        </div>

        <div className="feed_page__plus" onClick={openAddModal}>
          <Icon size="12">
            <PlusIcon/>
          </Icon>
          Добавить
        </div>
      </div>
      <div className="feed_page__search-panel">
        <SearchInput placeholder="Найти гостя по имени или телефону"/>
      </div>

      {!records.length && "Загрузка данных"}

      <Table gridTemplateColumns="100px 200px 1fr 200px" class="feed striped">

        <Row class="head">
          <Cell>Id</Cell>
          <Cell>Название</Cell>
          <Cell>Ссылка</Cell>
          <Cell>Родитель</Cell>
        </Row>
        {records.map((record, index) => {
          let {attrs} = record;
          return (
            <Row linkTo={`/navs/profile/${record.id}`} key={index}>
              <Cell>{record.id}</Cell>
              <Cell>{record[`title_${lang}`]}</Cell>
              <Cell>{record.link}</Cell>
              <Cell>{record.parent_id}</Cell>
            </Row>
          );
        })}

      </Table>

    </div>
  );
};

export default FeedView;