import React from 'react';
import moment from "moment";
import {Cell, Row, Table} from "../../../../app/ui/table";

const Payments = (props) => {

  const {payments} = props.data;
console.log(props.data);
  return (
    <div>

      <Table gridTemplateColumns="200px 200px 200px 200px 1fr 160px" class="feed striped">
        <Row>
          <Cell>Id</Cell>
          <Cell>Сумма</Cell>
          <Cell>Роль менежера</Cell>
          <Cell>Клуб</Cell>
          <Cell>Платеж проведен</Cell>
          <Cell>Платеж создан</Cell>
        </Row>
        {payments.map((payment, index) => {
          return(
            <Row key={index}>
              <Cell>{payment.id}</Cell>
              <Cell>{payment.sum}</Cell>
              <Cell>{payment.manager_role_id}</Cell>
              <Cell>{payment.club && payment.club.name_en}</Cell>
              <Cell>{payment.paid_at && moment(payment.paid_at).format("DD-MM-YYYY HH:mm")}</Cell>
              <Cell>{payment.created_at && moment(payment.created_at).format("DD-MM-YYYY HH:mm")}</Cell>
            </Row>
          );
        })}
      </Table>

    </div>
  );
};

export default Payments;