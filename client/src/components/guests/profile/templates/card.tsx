import React, {useContext} from 'react';
import moment from "moment/moment";
import {Cell, Row, Table} from "@/app/ui/table";
import Icon, {EditIcon} from "@app/ui/icons";
import BlockIcon from "@app/ui/icons/base/BlockIcon";
import {ModalContext} from "@app/modal/modal-wrapper";
import Add from "@/components/guests/modals/add";

const Card = (props) => {

  const {openModal} = useContext(ModalContext);

  const {data} = props;

  const openEditDialog = () => {
    openModal(<Add title="Редактировать данные гостя" data={data}/>);
  }

  const blockUser = () => {

  }

  return (
    <div>

      <Table gridTemplateColumns="200px 1fr" class="feed striped">

        <Row>
          <Cell>Id</Cell>
          <Cell>{data.id}</Cell>
        </Row>
        <Row>
          <Cell>Имя</Cell>
          <Cell>{data.name}</Cell>
        </Row>
        <Row>
          <Cell>Телефон</Cell>
          <Cell>{data.phone}</Cell>
        </Row>
        <Row>
          <Cell>Email</Cell>
          <Cell>{data.email}</Cell>
        </Row>
        <Row>
          <Cell>Регистрация</Cell>
          <Cell>{moment(data.created_at).format("DD-MM-YYYY HH:mm")}</Cell>
        </Row>
        <Row>
          <Cell>Уровень</Cell>
          <Cell>{data.level_id}</Cell>
        </Row>
        <Row>
          <Cell>Валюта удовольствия</Cell>
          <Cell>{data.points_count}</Cell>
        </Row>
        <Row>
          <Cell>Номер карты</Cell>
          <Cell>{data.card_num}</Cell>
        </Row>
        <Row>
          <Cell>Уровень карты</Cell>
          <Cell>{data.card_id}</Cell>
        </Row>
        <Row>
          <Cell>Комментарий</Cell>
          <Cell>{data.comment}</Cell>
        </Row>
        <Row>
          <Cell>Последнее обновление</Cell>
          <Cell>{moment(data.updated_at).format("DD-MM-YYYY HH:mm")}</Cell>
        </Row>
      </Table>

      <div className="links_with_icon__wrap" style={{justifyContent: 'space-between'}}>

        <div className="link_with_icon" onClick={blockUser}>
          <Icon size={20} fillHover="#E6008A">
            <BlockIcon className="link_with_icon__icon"/>
          </Icon>
          Заблокировать
        </div>

        <div
          className="link_with_icon"
          onClick={openEditDialog}
        >
          <Icon size={16} fillHover="#E6008A">
            <EditIcon className="link_with_icon__icon"/>
          </Icon>
          Редактировать данные
        </div>

      </div>

    </div>
  );
};

export default Card;