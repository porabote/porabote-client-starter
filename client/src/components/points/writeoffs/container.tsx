import React, {useEffect} from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedView from "./templates/feed-view";
import Api from "@/services/api-service";

const Container = () => {

  const fetchDicts = async () => {
    const dicts = await Api.get("/points/action/getDicts");
    return dicts.data;
  };

  const configs = {
    greedMap: {
      id: {
        width: '100px',
        label: {ru: 'ID', en: 'ID'},
      },
      created_at: {
        width: '160px',
        label: {ru: 'Время добавления', en: 'Created at'},
      },
      club_id: {
        width: '160px',
        label: {ru: 'Клуб', en: 'Club'},
      },
      card: {
        width: '120px',
        label: {ru: 'Карта', en: 'Card'},
      },
      discount: {
        width: '140px',
        label: {ru: 'Скидка по карте', en: 'Discount by card'},
      },
      card_type: {
        width: '140px',
        label: {ru: 'Тип карты', en: 'Card type'},
      },
      table_num: {
        width: '120px',
        label: {ru: 'Стол', en: 'Table'},
      },
      payment_type: {
        width: '120px',
        label: {ru: 'Тип', en: 'Type'},
      },
      sum: {
        width: '140px',
        label: {ru: 'Сумма', en: 'Sum'},
      },
      paid_at: {
        width: '160px',
        label: {ru: 'Время оплаты', en: 'Payment type'},
      },
    },
    form: [
      {
        name: 'email',
        component: 'input',
        type: 'text',
        label: {ru: 'Email*', en: 'Email*'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ],
      }
    ],
    filters: {

    }
  }

  return(
    <DataSourceWrapper
      relations={[
        'guest.card',
        'club',
      ]}
      setDicts={fetchDicts}
      greedMap={configs.greedMap}
      isFiltersOpen={true}
      modelName="payments">
      <FeedView/>
    </DataSourceWrapper>
  );
};

export default Container;