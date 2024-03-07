import React, {useState, useEffect} from 'react';
import moment from "moment";
import { Form, Field, Input, InputDate, Button } from "@/app/form";
import Grid from "porabote/grid";
import Payments from "@/components/payments/models/Payments";
import PaymentsSets from "@/components/payments-sets/models/PaymentsSets";
import notifacations from "@/app/notifications";
import ApiService from "@/components/payments-sets/services/ApiService";
import ExportHandlerBuilder from "@app/export-handler";

const PreviewSendPayments = (props) => {

  const [ids] = useState(props.payments_ids || [0]);
  const [payments, setPayments] = useState([]);
  const [rurAmount, setRurAmount] = useState(0);
  const [eurAmount, setEurAmount] = useState(0);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {

    let idsFiltered = [];
    for(let key in ids) {
      if (ids[key] == 1) idsFiltered.push(key);
    }
    if(idsFiltered.length == 0) idsFiltered.push(0);

    let payments = await new Payments()
      .setWhereIn({id: idsFiltered})
      .setWith(["bill", "status", "client", "object", "contractor"])
      .seHttpMethod("POST")
      .get();
    setPayments(payments.data);
  }

  const changeRate = async (date, formContext) => {
    let courses = await PaymentsSets.getCourses(moment(date).format("DD.MM.Y"));

    formContext.setAttribute("rate_usd", courses.list.USD.Value);
    formContext.setAttribute("rate_eur", courses.list.EUR.Value);

    //

    let eurAmount = 0;
    let rurAmount = 0;
    const rateEur = parseFloat(courses.list.EUR.Value.replace(',', '.'));
    const rateUsd = parseFloat(courses.list.USD.Value.replace(',', '.'));

    payments.forEach(payment => {

      if (payment.attributes.currency == "RUR") {
        rurAmount += parseInt(payment.attributes.summa);
        eurAmount += parseInt(payment.attributes.summa)/rateEur;
      } else if (payment.attributes.currency == "USD") {
        rurAmount += parseInt(payment.attributes.summa * rateUsd);
        // TODO eurAmount +=
      } else if (payment.attributes.currency == "EUR") {
        rurAmount += parseInt(payment.attributes.summa * rateEur);
        eurAmount += parseInt(payment.attributes.summa);
      }
    });

    setRurAmount(rurAmount.toFixed(2));
    setEurAmount(eurAmount.toFixed(2));

  }

  const sendPayments = async ({formContext, setIsButtonLoading, removeModalItem}) => {

    if (!formContext.entity.attributes.rate_eur || !formContext.entity.attributes.rate_usd) {
      notifacations.push(<p>Для отправки платежа, пожалуйста, укажите курсы валют.</p>);
      return;
    }

    setIsButtonLoading(true);
    let res = await ApiService.create(formContext.entity);
    setIsButtonLoading(false);
    if (res.error) {
      notifacations.push(<p>{res.error}</p>);
    } else {
      notifacations.push(<p>Платежи были успешно отправлены</p>);

      props.feedContext.submit();
      props.removeModalItem(0);
    }

  }

  const downloadXlsx = async ({formContext, setIsButtonLoading}) => {

    let payments_ids = [];
    for(let payments_id in props.payments_ids) {
      if (props.payments_ids[payments_id]) {
        payments_ids.push(payments_id);
      }
    }

    if (payments_ids.length == 0) {
      notifacations.push(<p>Список выбранных платежей пуст.</p>);
    } else {
      setIsButtonLoading(true);
      await new ExportHandlerBuilder()
        .setUri("/api/payments/method/downloadXlsx/")
        .setData({
          ...formContext.entity.getAttributes(),
          payments_ids,
        })
        .download();
      setIsButtonLoading(false);

    }

  }

  return (
    <div>
      <Form
        model={Payments}
        onSubmit={sendPayments}
        initValues={{
          rate_eur: 0,
          rate_usd: 0,
          date: null,
          payments_ids: Object.keys(props.payments_ids || []),
        }}
      >
        <div style={{display: "grid", gridTemplateColumns: "150px 150px 150px", gridGap: "10px"}}>
          <Field>
            <Input type="float" label="Курс EUR" name="rate_eur"/>
          </Field>
          <Field>
            <Input type="float" label="Курс USD" name="rate_usd"/>
          </Field>
          <Field>
            <InputDate label="В план оплат на" onSelect={changeRate} name="date"/>
          </Field>
        </div>
        <div className="form-buttons-panel">
          {!props.viewOnly &&
            <Field>
              <Button type="button" onClick={sendPayments} label="Сохранить пакет и отправить на оплату"/>
            </Field>
          }
          {props.viewOnly &&
            <Field>
              <Button type="button" onClick={downloadXlsx} label="Скачать XLSX"/>
            </Field>
          }
        </div>

      </Form>

      <Grid grid-template-columns="190px 220px 200px">
        <div className="head">
          <div>
            Кол-во платежей
          </div>
          <div>
            Итого (EUR)
          </div>
          <div>
            Итого (RUR)
          </div>
        </div>

        <div>
          <div>{payments.length}</div>
          <div>{eurAmount}</div>
          <div>{rurAmount}</div>
        </div>

      </Grid>

      <Grid grid-template-columns="80px 150px 120px 190px 220px 200px 140px 100px">

        <div className="head">
          <div>
            Номер
          </div>
          <div>
            Объект/PSP
          </div>
          <div>
            Дата платежа
          </div>
          <div>
            Счёт Номер/Дата
          </div>
          <div>
            Плательщик/Контрагент
          </div>
          <div>
            Сумма руб./ валюта счёта
          </div>
          <div>
            Назначение
          </div>
          <div>
            Код ВО
          </div>
        </div>

        {payments.map((record, index) => {

          const recordData = record.attributes;
          const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

          const {
            bill,
            status,
            client,
            object,
            contractor
          } = recordData;

          return(
            <div key={record.id}>
              <div>{record.id}</div>
              <div>
                <p><b>{object && object.name}</b></p>
                {Array.isArray(data_json) && data_json.map((item, index) => {
                  return <p key={index}>{item.summa} | {item.psp}</p>;
                })}
              </div>
              <div>
                <b>{moment(recordData.date_payment).format("DD.MM.Y")}</b>
              </div>
              <div>
                {bill &&
                  <span><b>{bill.number}</b>
                      <br></br>от {moment(bill.date)
                      .format("DD.MM.Y")}</span>
                }
              </div>
              <div>
                <b>{client && client.name}</b><br></br>
                {contractor && contractor.name}
              </div>
              <div>
                <b>{recordData.summa} / <u>{recordData.currency}</u></b><br></br>
              </div>
              <div>{recordData.purpose}</div>
              <div>{recordData.vo_code}</div>
            </div>
          );
        })}

      </Grid>

    </div>
  );
};

export default PreviewSendPayments;
