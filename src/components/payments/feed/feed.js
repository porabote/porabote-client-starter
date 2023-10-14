import React, { useState, useEffect } from "react";
import moment from "moment";
import { ButtonLazyLoad, Form, Field, Checkbox, Button } from "@/app/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Grid from "@/app/grid";
import FilterLeft from "./filter-left.tsx";
import FilterTop from "./filter-top";
import TopPanel from "./top-panel";
import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "@components/feed/feed-preloader";
import Payments from "../models/Payments";
import { updateFeedFilters } from "../redux-store/actions";
import ExportHandlerBuilder from "@app/export-handler";

const Feed = (props) => {

  const [isAccessLoaded, setIsAccessLoaded] = useState(false);
  const [isCanAccept, setIsCanAccept] = useState(false);
  const [contractors, setContractors] = useState(new Set());
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    getAccessData();
  }, []);

  const getAccessData = async () => {
    let res = await new Payments().post('checkButtonAccess');
    setIsCanAccept(res.data.isCanAccept);

    let contractors = new Set();
    res.data.contractors.forEach(contractor => {
      contractors.add(contractor.id);
    });
    setContractors(contractors);
    setIsAccessLoaded(true);
  }

  const {
    title,
    filter,
    data,
    meta,
    loading,
  } = useAppSelector(state => state.payments);

  if (loading && !meta.count && !isAccessLoaded) {
    return <FeedPreloader title={title}/>;
  }

  const save = (entity) => {
    updateFeedFilters(entity.attributes);
  };

  const downloadPaymentScan = (recordId) => {

    new ExportHandlerBuilder()
      .setUri("/api/payments/method/getScansAsPdf/")
      .setData({
        payment_id: recordId,
      })
      .download();

  }

  return (

    <Form
      model={Payments}
      initValues={{ ...filter, checkbox_check_all: 0 }}
      onSubmit={save}
    >
      <div className="content feed">

        <div className="content__top-filter">
          <Field>
            <FilterTop setAllChecked={setAllChecked}/>
          </Field>
        </div>

        <div className="content-title">
          <MenuIcon style={{
            color: "#999",
            marginRight: "11px",
            fontSize: "16px"
          }}/>
          {title}
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <TopPanel />
        </div>

        <div className="content__body">

          <Grid grid-template-columns="50px 90px 200px 180px 200px 270px 170px 220px 220px">

            <div className="head">
              <div>
                <Field>
                  <Checkbox
                    checked={allChecked}
                    name={`checkbox_check_all`}
                    onSelect={(status, context) => {

                      let ids = context.entity.getAttribute('index_records_ids');

                      for (const id in ids) {
                        context.setAttribute(`index_records_ids.${id}`, status ? 1 : 0);
                      }
                      //setAllChecked(status);
                    }}
                  />
                </Field>
              </div>
              <div>
                Акцепт/Id
                <sup className="grid_list__item sup">Accept/Id</sup>
              </div>
              <div>
                Номер/Скан счёта
                <sup className="grid_list__item sup">Number/Bills scan copy</sup>
              </div>
              <div>
                Статус/Дата оплаты
                <sup className="grid_list__item sup">Status/Date of payment</sup>
              </div>
              <div>
                Объект/PSP
                <sup className="grid_list__item sup">Object/PSP</sup>
              </div>
              <div>
                Плательщик/Поставщик
                <sup className="grid_list__item sup">Zahler/Der Zulieferer</sup>
              </div>
              <div>
                Сумма/Вид (%) оплаты
                <sup className="grid_list__item sup">Sum/Type/Pr. payment</sup>
              </div>
              <div>
                Предмет счёта/Примечание
                <sup className="grid_list__item sup">Gegenstand der Rechnung/Anmerkungen</sup>
              </div>
              <div>
                Назначение платежа
                <sup className="grid_list__item sup">Zahlungszweck</sup>
              </div>
            </div>

            {data.map((record, index) => {

              const recordData = record.attributes;
              const {
                bill,
                status,
                client,
                object,
                contractor
              } = record.relationships;

              const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

              return (
                <div linkTo={`/payments/view/${recordData.id}`} key={recordData.id}>
                  <div noRoute>
                    <Field>
                      <Checkbox
                        //checked={allChecked ? true : false}
                        name={`index_records_ids.${recordData.id}`}
                      />
                    </Field>
                  </div>
                  <div noRoute>
                    <Field>
                      <Checkbox
                        // disabled={() => {
                        //   return contractors.has(parseInt(recordData.client_id)) ? false : true;
                        // }}
                        value={recordData.acceptor_id ? 1 : 0}
                        name={`accepted.${recordData.id}`}
                        className="checkbox-toggle"
                        // responseDependent={true}
                        // onClick={() => {
                        //   alert(88);
                        // }}
                        onSelect={async (status) => {
                          return {
                            status: await Payments.setAccept(recordData.id, status),
                          };
                        }}
                      />
                    </Field>
                    {recordData.id}
                  </div>
                  <div noRoute>
                    {bill && bill.attributes &&
                      <span><b>{bill.attributes.number}</b>
                      <br></br>от {moment(bill.attributes.date)
                          .format("DD.MM.Y")}</span>
                    }
                    {bill && bill.attributes.file_of_bill &&
                      <a
                        onClick={() => downloadPaymentScan(record.id)}
                        className="grid_list__icon link-arrow-blank left"
                        target="blank">
                        Скан PDF
                      </a>
                    }
                  </div>
                  <div>
                    {status && status.attributes &&
                      <span><b>{status.attributes.name}</b><br></br>
                      <i>план {moment(recordData.date_payment)
                        .format("DD.MM.Y")}</i> ({recordData.pay_week})
                      </span>
                    }
                  </div>
                  <div>
                    <b>{object && object.attributes && object.attributes.name}</b><br></br>
                    {Array.isArray(data_json) && data_json.map((item, index) => {
                      return <p key={index}>{item.summa} | {item.psp}</p>;
                    })}
                  </div>
                  <div>
                    <b>{client && client.attributes && client.attributes.name}</b><br></br>
                    {contractor && contractor.attributes && contractor.attributes.name}
                  </div>
                  <div>
                    <b>{recordData.summa} <u>{recordData.currency}</u></b><br></br>
                    <i>{recordData.pay_type} ({recordData.percent_of_bill}%)</i>
                  </div>
                  <div>
                    {bill && bill.attributes.comment}<br></br>
                    <i>{recordData.comment}</i>
                  </div>
                  <div>{recordData.purpose}</div>
                </div>
              );
            })
            }
          </Grid>
          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>

        </div>

      </div>
    </Form>
  );
};

export default Feed;
