import React, {useContext} from 'react';
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import {Cell, Row, Table} from "@/app/ui/table";
import moment from "moment";
import Icon, {PlusIcon} from "@app/ui/icons";
import Add from "@/components/guests/modals/add";
import {ModalContext} from "@app/modal/modal-wrapper";
import {SettingsContext} from "@app/settings/settings";
import FeedFilter from "@/components/guests/feed/elements/feed-filter";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import card from "@/components/guests/profile/templates/card";
import GuestCheckinsModal from "@/components/checkins/modals/guest-checkins-modal";
import {NavLink} from "react-router-dom";
import PaginationBlock from "@app/data-source/pagination-block";
import LazyLoadBtn from "@app/data-source/lazy-load-btn";

const FeedView = () => {

  const {records, greedMap} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<Add title="Регистрация гостя"/>);
  }

  const openCheckinsDetails = (record) => {
    openModal(<GuestCheckinsModal record={record} title={`Чекины пользователя ${record.name}`}/>);
  }

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">

        <div className="feed_page__title">
          <h2>Гости</h2>
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
      <Greed map={greedMap} records={records} class="feed striped">
        <GreedColumn name="id" dataKey="id" render={(record) => {
          return(
            <NavLink to={`/guests/profile/${record.id}`} style={{textDecoration: 'underline', fontWeight: '900'}}>
              {record.user_id}
            </NavLink>
          );
        }}/>
        <GreedColumn name="name" dataKey="phone" width="200px"
                     render={(record) => <div><b>{record.name}</b><br/> {record.phone}</div>}/>
        <GreedColumn
          name="payments_sum"
          render={(record) => {
            return <div>Всего: <b>{record.payments_sum || 0}</b></div>
          }}
          />
        <GreedColumn
          name="checkins_count"
          render={(record) => <div className="link_black" onClick={() => openCheckinsDetails(record)}>{record.checkins_count}</div>}/>
        <GreedColumn name="sum_average" render={(record) => {

          let avgSum = 0;
          if (record.payments_sum) {
            avgSum = parseInt(record.payments_sum || 0) / parseInt(record.checkins_count);
          }

          return <div>{avgSum} </div>
        }}/>
        <GreedColumn name="card" render={(record) => <div>{record.card && record.card.title} </div>}/>
        <GreedColumn name="points_count" render={(record) => <div>{record.points_count} </div>}/>
        <GreedColumn
          render={(record) => <div>{record.last_checkin && moment(record.last_checkin.created_at).format("DD-MM-YYYY HH:mm")} </div>}
          name="last_checkin"/>
        <GreedColumn name="created_at" render={(record) => moment(record.created_at).format("DD-MM-YYYY HH:mm")}/>
      </Greed>
      <LazyLoadBtn/>

    </div>
  );
};

export default FeedView;