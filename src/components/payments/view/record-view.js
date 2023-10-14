import React, {useEffect, useState} from 'react'
import {Table, Row, Cell} from '/app/ui/table';
import {Button} from "/app/form";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import AddForm from "../forms/add-form";
import modal from "@app/modal";
import Payments from "../models/Payments";
import AccessLists from "../../access-lists/models/AccessLists";
import RequestForCancel from "../feed/dialogs/request-for-cancel";

const RecordView = (props) => {

  const [isAllowCancelRequest, setIsAllowCancelRequest] = useState(false);

  useEffect(() => {
    checkButtonAccess();
  }, []);

  const checkButtonAccess = async () => {
    let allowCancelRequestCheck = await AccessLists.check(15);
    setIsAllowCancelRequest(allowCancelRequestCheck);
  }


  const attrs = props.data.attributes;
  const {
    status,
    client,
    object,
    payments_set
  } = props.data.relationships;

  let psps = attrs.data_json ? JSON.parse(attrs.data_json).info : [];
  if (typeof psps == "object") psps = Object.keys(psps).map(index => psps[index]);

  const openDialogEditForm = () => {
    modal.open(<AddForm title="Редактировать платёж" {...props}/>);
  }

  const requestForCancelHandler = async (args) => {
    modal.open(
      <RequestForCancel
        title="Подтверждение запроса на отмену."
        payments_ids={[props.data.id]}
        viewOnly={false}
      />,
    );
  }

  return (
    <div>

      <div className="buttons-panel">
        <Button
          label="Отменить платёж"
          isVisible={() => {
            return (attrs.status_id == 41 && isAllowCancelRequest);
          }}
          onClick={requestForCancelHandler}
        />
      </div>

      <Table class="striped" gridTemplateColumns="160px minmax(250px, 1fr)">

        <Row>
          <Cell><b>ID платежа</b></Cell>
          <Cell>
            {props.data.id}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Статус</b></Cell>
          <Cell>
            {props.data.relationships.status.attributes.name}
          </Cell>
        </Row>

        <Row>
          <Cell><b>PSP элемент</b></Cell>
          <Cell>
            {psps.map((psp, index) => {
              return <p key={index} style={{whiteSpace: "nowrap"}}>{psp.summa} | {psp.psp}</p>;
            })}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Объект</b></Cell>
          <Cell>
            {props.data.relationships.object.attributes.name}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Плательщик</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.name}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Контрагент</b></Cell>
          <Cell>
            {props.data.relationships.client.attributes.name}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Счет</b></Cell>
          <Cell>
            <a target="_blank" href={`/store/bills/view/${props.data.relationships.bill.id}`}>
              {props.data.relationships.bill.attributes.number}
            </a>
            от {moment(props.data.relationships.bill.attributes.date).format("DD.MM.Y")}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Сумма</b></Cell>
          <Cell>
            {props.data.attributes.summa}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Процент оплаты</b></Cell>
          <Cell>
            {props.data.attributes.percent_of_bill}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Сумма в евро</b></Cell>
          <Cell>
            {payments_set && payments_set.attributes.rate_euro &&
              (props.data.attributes.summa / payments_set.attributes.rate_euro).toFixed(2)
            }
          </Cell>
        </Row>

        <Row>
          <Cell><b>Платежный день</b></Cell>
          <Cell>
            {moment(props.data.attributes.date_payment).format("DD.MM.Y")}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Вид оплаты</b></Cell>
          <Cell>
            {props.data.attributes.pay_type}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Объект платежа</b></Cell>
          <Cell>
            {props.data.attributes.pay_object}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Предмет счета</b></Cell>
          <Cell>
            {props.data.relationships.bill.attributes.comment}
          </Cell>
        </Row>

        <Row>
          <Cell><b>НДС %</b></Cell>
          <Cell>
            {props.data.attributes.nds_percent ? props.data.attributes.nds_percent : "Без НДС"}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Назначение платежа</b></Cell>
          <Cell>
            {props.data.attributes.purpose}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Примечание</b></Cell>
          <Cell>
            {props.data.attributes.comment}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Код ВО</b></Cell>
          <Cell>
            {props.data.attributes.vo_code}
          </Cell>
        </Row>

        <Row>
          <Cell><b>План оплат</b></Cell>
          <Cell>
            {props.data.attributes.payments_set_id}
          </Cell>
        </Row>
      </Table>


      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

        <div
          className="link_with_icon"
          onClick={openDialogEditForm}
        >
          <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
          Редактировать данные
        </div>

        {/*<div className="link_with_icon" onClick={() => props.deleteRecord(user.id, props.fetchFeedData)}>*/}
        {/*  <ClearIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>*/}
        {/*  Удалить спикера*/}
        {/*</div>*/}

      </div>

    </div>
  );

}

export default RecordView;
