import React from 'react';
import moment from "moment/moment";
import {Cell, Row, Table} from "@/app/ui/table";

const Gifts = (props) => {

  const {gifts} = props.data;

  return (
    <div>
      <Table gridTemplateColumns="200px 200px 200px 200px 1fr" class="feed striped">
        <Row>
          <Cell>Начислен</Cell>
          <Cell>Получен</Cell>
          <Cell>Активирован</Cell>
          <Cell>Тип</Cell>
        </Row>
        {gifts.map((gift, index) => {
          const {attrs} = gift;
          return(
            <Row key={index}>
              <Cell>{attrs.created_at}</Cell>
              <Cell>{attrs.received_at}</Cell>
              <Cell>{attrs.club_id}</Cell>
              <Cell>{attrs.paid_at && moment(attrs.paid_at).format("DD-MM-YYYY HH:mm")}</Cell>
            </Row>
          );
        })}
      </Table>
    </div>
  );
};

export default Gifts;