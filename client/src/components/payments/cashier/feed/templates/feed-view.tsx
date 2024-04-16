import React, {useContext, useEffect, useState} from 'react';
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import {Cell, Row, Table} from "@/app/ui/table";
import moment from "moment";
import SearchInput from "@/app/ui/search-input";
import Icon, {PlusIcon} from "@/app/ui/icons";
import {ModalContext} from "@/app/modal/modal-wrapper";
import EditPaymentModal from "@/components/payments/modals/edit-payment";
import {SettingsContext} from "@/app/settings/settings";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import {BalloonContext} from "@app/balloon/balloon-wrapper";
import UnpaidPaymentsList from "@/components/payments/cashier/feed/templates/unpaid-payments-list";
import DailyReportFilter from "@/components/payments/cashier/feed/templates/daily-report-filter";
import StringFormat from "@/app/collections/string-format";
import PaginationBlock from "@app/data-source/pagination-block";
import LazyLoadBtn from "@app/data-source/lazy-load-btn";

const FeedView = () => {

  const {records, greedMap, fetchData} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);
  const {showMsg} = useContext(BalloonContext);

  const types = {
    2: 'Хостес',
    4: 'Фишки',
    3: 'Официант',
    5: 'Бар',
  }

  const openEditPaymentModal = (record) => {
    openModal(<EditPaymentModal record={record} fetchData={fetchData} title="Изменить сумму платежа"/>);
  }

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">
        <div className="feed_page__title">
          <h2>Счета гостей</h2>
        </div>
      </div>

      <DailyReportFilter/>

      {!records.length && "Загрузка данных"}

      <UnpaidPaymentsList/>

      <div>
        <h3 style={{padding: '20px 10px'}}>Оплаченные счета</h3>

        <PaginationBlock/>
        <Greed map={greedMap} records={records} class="feed striped">
          <GreedColumn name="id" dataKey="id"/>
          <GreedColumn
            render={(record) => <div><b>{record.created_at && moment(record.created_at).format("DD-MM-YYYY HH:mm")} </b>
            </div>}
            name="created_at" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.club && record.club[`name_${lang}`]} </div>}
            name="club_id" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.guest && record.guest.card && record.guest.card_num} </div>}
            name="card" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.guest && record.guest.card && record.guest.card.title} </div>}
            name="card_type" width="180px"/>

          <GreedColumn
            render={(record) => <div>{record.type} </div>}
            name="payment_type" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.table_num} </div>}
            name="table_num" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.type} </div>}
            name="payment_type" width="180px"/>
          <GreedColumn
            render={(record) => {
              return(
                <div onClick={() => openEditPaymentModal(record)} style={{textAlign: 'right'}}>
                <span style={{borderBottom: '1px dashed #555'}}>
                  <b>{StringFormat.priceFormatInt(record.sum, "*** *** ***")}</b>
                </span>
                </div>
              );
            }}
            name="sum" width="180px"/>
          <GreedColumn
            render={(record) => <div>{record.paid_at && moment(record.paid_at).format("DD-MM-YYYY HH:mm")} </div>}
            name="paid_at" width="180px"/>
        </Greed>

        <LazyLoadBtn/>
      </div>


    </div>
  );
};

export default FeedView;