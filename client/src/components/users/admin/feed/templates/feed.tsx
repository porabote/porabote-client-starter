import React, {useContext} from 'react';
import {DataSourceContext} from "@app/data-source/data-source-wrapper";
import {ModalContext} from "@app/modal/modal-wrapper";
import {SettingsContext} from "@app/settings/settings";
import Add from "@/components/users/admin/modals/add";
import Icon, {PlusIcon} from "@app/ui/icons";
import FeedFilter from "../elements/feed-filter";
import PaginationBlock from "@app/data-source/pagination-block";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import {NavLink} from "react-router-dom";
import moment from "moment/moment";
import LazyLoadBtn from "@app/data-source/lazy-load-btn";
import config from "../configs";

const Feed = () => {

  const {records, greedMap} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<Add title="Регистрация гостя"/>);
  }

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">
        <div className="feed_page__title">
          <h2>Пользователи</h2>
        </div>

        <div className="feed_page__plus" onClick={openAddModal}>
          <Icon size="12">
            <PlusIcon/>
          </Icon>
          Добавить
        </div>

      </div>

      <FeedFilter/>

      {!records && "Загрузка данных"}

      <PaginationBlock/>
      <Greed map={config.greedMap} records={records} class="feed striped">
        <GreedColumn name="id" dataKey="id" render={(record) => {
          return(
            <NavLink to={`/admin/users/profile/${record.id}`} style={{textDecoration: 'underline', fontWeight: '900'}}>
              {record.id}
            </NavLink>
          );
        }}/>
        <GreedColumn name="email" render={(record) => record.email}/>
        <GreedColumn name="name" render={(record) => record.name}/>
        <GreedColumn name="surname" render={(record) => record.surname}/>
        <GreedColumn name="post_name" render={(record) => record.post_name}/>
        <GreedColumn name="created_at" render={(record) => moment(record.created_at).format("DD-MM-YYYY HH:mm")}/>
        <GreedColumn name="updated_at" render={(record) => moment(record.updated_at).format("DD-MM-YYYY HH:mm")}/>
        <GreedColumn name="status" render={(record) => record.status}/>
      </Greed>
      <LazyLoadBtn/>

    </div>
  );
};

export default Feed;