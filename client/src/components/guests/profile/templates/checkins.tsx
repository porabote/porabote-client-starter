import React from 'react';
import {Cell, Row, Table} from "@/app/ui/table";
import moment from "moment/moment";

const Checkins = (props) => {

  const {checkins} = props.data;

  return (
    <div>
      <Table gridTemplateColumns="200px 200px 200px 1fr" class="feed striped">
        <Row>
          <Cell>Уровень трат</Cell>
          <Cell>Друзей</Cell>
          <Cell>Клуб</Cell>
          <Cell>Время чекина</Cell>
        </Row>
        {checkins.map((checkin, index) => {
          return(
            <Row key={index}>
              <Cell>{checkin.avg_payment}</Cell>
              <Cell>{checkin.friends}</Cell>
              <Cell>{checkin.club_id}</Cell>
              <Cell>{checkin.created_at && moment(checkin.created_at).format("DD-MM-YYYY HH:mm")}</Cell>
            </Row>
          );
        })}
      </Table>
    </div>
  );
};

export default Checkins;