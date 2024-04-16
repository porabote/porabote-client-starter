import React, {useEffect} from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedView from "./templates/feed-view";
import Api from "@/services/api-service";

const FeedContainer = () => {

  const fetchDicts = async () => {
    const dicts = await Api.get("/guests/action/getDicts");
    return dicts.data;
  };

  const configs = {
    greedMap: {
      id: {
        width: '100px',
        label: {ru: 'ID', en: 'ID'},
      },
      name: {
        width: '1fr',
        label: {ru: 'Гость', en: 'Guest'},
      },
      created_at: {
        width: '200px',
        label: {ru: 'Добавлен', en: 'Created date'},
      },
      payments_sum: {
        width: '140px',
        label: {ru: 'Траты', en: 'Spending sum'},
      },
      checkins_count: {
        width: '80px',
        label: {ru: 'Чекины', en: 'Checkins'},
      },
      sum_average: {
        width: '140px',
        label: {ru: 'Средний чек', en: 'Average check'},
      },
      card: {
        width: '140px',
        label: {ru: 'Карта', en: 'Card'},
      },
      points_count: {
        width: '100px',
        label: {ru: 'ВУ', en: 'PC'},
      },
      last_checkin: {
        width: '140px',
        label: {ru: 'Последний чекин', en: 'Last checkin'},
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
        'last_checkin',
        'card',
        'level',
      ]}
      setDicts={fetchDicts}
      greedMap={configs.greedMap}
      isFiltersOpen={true}
      modelName="guests">
      <FeedView/>
    </DataSourceWrapper>
  );
};

export default FeedContainer;