import React, {useContext, useEffect, useState} from 'react';
import ApiService from "@/services/api-service";
import {BalloonContext} from "@app/balloon/balloon-wrapper";
import Greed from "@app/ui/greed";
import GreedColumn from "@app/ui/greed/greed-column";
import moment from "moment/moment";
import {Button, Input} from "@app/form";
import {SettingsContext} from "@app/settings/settings";
import InputMask from "@app/form/Input/input-mask";
import StringFormat from "@/app/collections/string-format";

const UnpaidPaymentsList = () => {

  const [unpaidPayments, setUnpaidPayments] = useState([]);
  const paymentsQueueMap = new Map();
  const {showMsg} = useContext(BalloonContext);
  const {lang} = useContext(SettingsContext);

  useEffect(() => {
    getUnpaidPayments();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getUnpaidPayments();
    }, 15000000);

    // очистка интервала
    return () => clearInterval(timer);
  });

  const getUnpaidPayments = async () => {

    const res = await ApiService.get("/payments/get/", {}, {
      query: {
        relations: [
          'guest.card',
          'club',
        ],
        where: {
          paid_at: {
            operand: 'IS NULL',
            value: '',
          }
        },
      },
    });

    let newRecordsList = [];

    res.data.forEach((record) => {
      if (!paymentsQueueMap.has(record.id)) {
        newRecordsList.push(record);
        paymentsQueueMap.set(record.id, record);
      } else {
        newRecordsList.push(paymentsQueueMap.get(record.id));
      }
    });

    setUnpaidPayments(newRecordsList);

  }

  const types = {
    2: 'Хостес',
    4: 'Фишки',
    3: 'Официант',
    5: 'Бар',
  }

  let savePayment = async (record) => {

    const res = await ApiService.post("/payments/action/updateRecord", {
      id: record.id,
      sum: record.sum,
      table_num: record.table_num,
    });

    if (typeof res.error != "undefined") {
      showMsg(res.error);
    } else {
      showMsg("Платеж сохранен");
      getUnpaidPayments();
    }
  }

  const configs = {
    greedMap: {
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
        width: '80px',
        label: {ru: 'Стол', en: 'Table'},
      },
      manager_role_id: {
        width: '120px',
        label: {ru: 'Тип', en: 'Type'},
      },
      sum: {
        width: '140px',
        label: {ru: 'Сумма', en: 'Sum'},
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
    filters: {}
  }

  return (
    <div style={{paddingBottom: '30px'}}>
      <h3 style={{padding: '20px 10px'}}>Очередь на оплату</h3>
      <Greed map={configs.greedMap} records={unpaidPayments} class="feed striped">
        <GreedColumn
          render={(record) => <div><b>{record.created_at && moment(record.created_at).format("DD-MM-YYYY HH:mm")}</b> </div>}
          name="created_at" width="180px"/>
        <GreedColumn
          render={(record) => <div>{record.club && record.club[`name_${lang}`]} </div>}
          name="club_id" width="180px"/>
        <GreedColumn
          render={(record) => <div>{record.guest && record.guest.card && record.guest.card_num} </div>}
          name="card" width="180px"/>
        <GreedColumn
          render={(record) => <div
            className="discount_caps">{record.guest && record.guest.card && record.guest.card.discount} </div>}
          name="discount" width="180px"/>
        <GreedColumn
          render={(record) => <div>{record.guest && record.guest.card && record.guest.card.title} </div>}
          name="card_type" width="180px"/>

        <GreedColumn
          render={(record) => {
            return record.manager_role_id ? types[record.manager_role_id] : '';
          }}
          name="manager_role_id" width="180px"/>
        <GreedColumn
          render={(record) => {
            if (!record.table_num) {
              return <div>{record.table_num}</div>;
            }
            return(
              <div>
                <Input
                  mask="*** *** ***"
                  onChange={(e, {newValue}) => {
                    let rec = paymentsQueueMap.get(record.id);
                    rec.table_num = newValue;
                  }}
                  classModifier="filter-min"
                  name="table_num"
                  value={record.table_num}/>
              </div>
            );
          }}
          name="table_num" width="180px"/>

        <GreedColumn
          render={(record) => {
            return(
              <div>
                <Input
                  format={{
                    handler: (rawValue) => {
                      return StringFormat.priceFormatInt(rawValue, "*** *** ***");
                    },
                  }}
                  onChange={(e, {newValue}) => {
                    let rec = paymentsQueueMap.get(record.id);
                    rec.sum = newValue;
                  }}
                  classModifier="filter-min"
                  name="sum"
                  value={record.sum}/>
              </div>
            );
          }}
          name="sum" width="160px"/>
        <GreedColumn
          render={(record) => <div><Button onClick={() => savePayment(paymentsQueueMap.get(record.id))} class="prb-button submit_ok" label="OK"/></div>}
          name="accept_btn" width="60px"/>
      </Greed>
    </div>
  );
};

export default UnpaidPaymentsList;