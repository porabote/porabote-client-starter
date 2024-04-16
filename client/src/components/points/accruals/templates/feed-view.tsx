import React, {useContext} from 'react';
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import moment from "moment";
import Icon, {PlusIcon} from "@/app/ui/icons";
import {ModalContext} from "@/app/modal/modal-wrapper";
import {SettingsContext} from "@/app/settings/settings";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import FeedFilter from "./feed-filter";

const FeedView = () => {

  const {records} = useContext(DataSourceContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  // const openAddModal = () => {
  //   openModal(<Add title="Добавить"/>);
  // }

  const greedMap = {

  };

  return (
    <div className="feed_page">

      <div className="feed_page__top-panel">
        <div className="feed_page__title">
          <h2>Валюта удовольствия - Начисления</h2>
        </div>
        
      </div>

      <FeedFilter/>

      {!records.length && "Загрузка данных"}


      <Greed map={greedMap} records={records} class="feed striped">
        <GreedColumn width="80px" label={{ru: 'ID', en: 'ID'}} name="id" dataKey="id" render={(record) => `${record.id}`}/>
        <GreedColumn width="160px" label={{ru: 'Время начисления', en: 'Created at'}} name="created_at" render={(record) => moment(record.created_at).format("DD-MM-YYYY HH:mm")}
        />
        <GreedColumn width="160px" label={{ru: 'Гость', en: 'Guest'}} name="guest" dataKey="phone"
                     render={(record) => <div><b>{record.guest && record.guest.name}</b><br/> {record.guest && record.guest.phone}</div>}/>
        <GreedColumn width="180px" label={{ru: 'Описание', en: 'Desc'}} name="desc" render={(record) => <div>{record.title} </div>}/>

        <GreedColumn width="120px" label={{ru: 'Количество ВУ', en: 'Pc quantity'}} name="value" render={(record) => <div>{record.value} </div>}/>

        <GreedColumn
          width="160px"
          label={{ru: 'Менеджер', en: 'Manager'}}
          render={(record) => <div>{record.manager && record.manager.name} </div>}
          name="manager"/>

        <GreedColumn
          width="100px"
          label={{ru: 'Клуб', en: 'Club'}}
          render={(record) => <div>{record.club && record.club[`name_${lang}`]} </div>}
          name="club"/>

      </Greed>

    </div>
  );
};

export default FeedView;