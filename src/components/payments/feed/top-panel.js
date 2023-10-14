import React, {useState, useEffect} from 'react';
import {Field, Button} from "@/app/form";
import PreviewSendPayments from "./dialogs/preview-send-payments";
import modal from "@app/modal";
import notifacations from "@/app/notifications";
import Payments from "../models/Payments";
import ExportHandlerBuilder from "@app/export-handler";
import RequestForCancel from "./dialogs/request-for-cancel";
import AccessLists from "../../access-lists/models/AccessLists";

const TopPanel = props => {

  const [isCanAccept, setIsCanAccept] = useState(false);
  const [isAllowCancelRequest, setIsAllowCancelRequest] = useState(false);
  const [contractors, setContractors] = useState(new Set());

  useEffect(() => {
    checkButtonAccess();
  }, []);

  const checkButtonAccess = async () => {
    let res = await new Payments().post('checkButtonAccess');
    setIsCanAccept(res.data.isCanAccept);

    let allowCancelRequestCheck = await AccessLists.check(15);
    setIsAllowCancelRequest(allowCancelRequestCheck);

    let contractors = new Set();
    res.data.contractors.forEach(contractor => {
      contractors.add(contractor.id);
    });
    setContractors(contractors);
  }

  const exportScans = async (props) => {

    let ids = props.formContext.entity.attributes.index_records_ids;
    let idsSet = new Set();

    if (!ids || ids.length == 0) {
      notifacations.push(<p>Пожалуйста, выберите платежи.</p>);
      return;
    } else {
      for (const id in ids) {
        if (ids[id]) {
          idsSet.add(id);
        }
      }
    }

    props.setIsButtonLoading(true);
    let exportHandler = await new ExportHandlerBuilder()
      .setUri("/api/payments/method/downloadScans/")
      .setData({
        ids: Array.from(idsSet),
      })
      .download();
    props.setIsButtonLoading(false);
  }

  return (
    <React.Fragment>
      <div className="buttons-panel">

        <Field>
          <Button
            isVisible={(props) => {
              let statusId = props.formContext.entity.getAttribute('where.status_id');
              let clientId = props.formContext.entity.getAttribute("where.client_id");

              return (statusId == 42 && contractors.has(clientId)) ? true : false;
            }}
            label="Просмотр и отправка"
            onClick={(props) => {
              let ids = props.formContext.entity.attributes.index_records_ids;

              if (!ids || ids.length == 0) {
                notifacations.push(<p>Пожалуйста, выберите платежи.</p>);
                return;
              }

              modal.open(
                <PreviewSendPayments
                  title="Просмотр и отправка платежей."
                  contractors={contractors}
                  payments_ids={ids}
                  viewOnly={false}
                  feedContext={props.formContext}
                />,
              );
            }}
          />
        </Field>
        <Field>
          <Button
            label="Просмотреть выбранное"
            onClick={(props) => {
              let ids = props.formContext.entity.attributes.index_records_ids;

              if (!ids || ids.length == 0) {
                notifacations.push(<p>Пожалуйста, выберите платежи.</p>);
                return;
              }

              let clientId = props.formContext.entity.getAttribute("where.client_id");

              const viewOnly = (contractors.has(clientId)) ? false : true;

              modal.open(
                <PreviewSendPayments
                  viewOnly={true}
                  title="Просмотр и отправка платежей."
                  contractors={contractors}
                  payments_ids={ids}
                />,
              );
            }}
          />
        </Field>

        <Field>
          <Button
            label="Скачать скан-копии"
            onClick={exportScans}
          />
        </Field>

        {/* <Field> */}
        {/*   <Button */}
        {/*     label="Запрос на отмену" */}
        {/*     onClick={(props) => { */}
        {/*       notice.push(<p>Таблица была обновлена</p>, {type: "OK"}); */}
        {/*     }} */}

        {/*   /> */}
        {/* </Field> */}

        {/* <Field> */}
        {/*   <Button */}
        {/*     label="Назначить GUIDS" */}
        {/*     onClick={(props) => { */}
        {/*       Api.get("/api/GuidsSchneider/method/assignContractors/"); */}
        {/*     }} */}
        {/*   /> */}
        {/* </Field> */}

      </div>

      {/* <div> */}
      {/*   <span onClick={openAddModal} className="button-drop"> */}
      {/*       Добавить */}
      {/*   </span> */}
      {/* </div> */}

    </React.Fragment>
  );
}

export default TopPanel;
