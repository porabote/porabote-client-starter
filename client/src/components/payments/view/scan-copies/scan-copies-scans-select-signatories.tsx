import React, {useState, useEffect} from 'react';
import moment from "moment";
import {Form, Field, Button, InputDate, Select} from "/app/form";
import Icon, {DoneIcon} from "@/app/ui/icons";
import Payments from "@/components/payments/models/Payments";
import Observers from "@/components/observers/models/Observers";
import AccessListsUsers from "../../../access-lists/models/AccessListsUsers";
import AccessLists from "../../../access-lists/models/AccessLists";

const ScanCopiesScansSelectSignatories = (props) => {

  const [selectedObserver, setSelectedObserver] = useState(null);

  // Вынес в отдельную функцию что бы сделать выбранным последнего подписанта
  const getObservers = async () => {
    let observersList = await new Observers()
      .setWhere({business_event_id: 27, entity_id: props.recordId})
      .setWith(['user'])
      .get();

    if (observersList.data.length > 0) {
      let lastRecord = observersList.data[observersList.data.length - 1];
      setSelectedObserver(lastRecord.attributes.user_id);
    }

    let signUsersList = AccessLists.getList(22);

    console.log(observersList.data);
    return observersList.data;
  }

  const submit = async (entity) => {

    let isOk = await Payments.createFacsimileTable(
      entity.attributes.user_id,
      props.scanFileId,
      props.recordId,
      {...entity.attributes},
    );

    if (isOk) {
      props.getScanFiles();
      props.removeModalItem(0);
    }

  }

  return (
    <div>

      <Form
        setEntity={() => Observers.createEntity({
          user_id: selectedObserver,
          status: "Счет акцептован",
          date: moment().format('YYYY-MM-DD'),
        })}
        onSubmit={submit}
      >

        <div className="form-fieldset" style={{gridTemplateColumns: "100%"}}>
          <Field>
            <Select
              name="user_id"
              value={selectedObserver}
              label="Подписант"
              setData={async () => {
                return await getObservers();
              }}
              optionValueKey="attributes.user_id"
              optionTitle={(record) => {
                let user = record.relationships.user.attributes;
                return `${user.name} - ${user.post_name}`;
              }}
            />
          </Field>

          <Field>
            <Select
              name="status"
              label="Статус в таблице печати:"
              setData={() => {
                return [
                  {name: "Счет акцептован"},
                  {name: "Получено"},
                ];
              }}
              optionValueKey="name"
              optionTitle={(record) => {
                return record.attributes.name;
              }}
            />
          </Field>

          <Field>
            <InputDate value={new Date()} name="date" label="Дата акцепта"/>
          </Field>

          <div className="buttons-panel">
            <Field>
              <Button label="Выбрать" style={{width: '140px'}}>
                <Icon>
                  <DoneIcon/>
                </Icon>
              </Button>

            </Field>
          </div>

        </div>

      </Form>

    </div>
  );
};

export default ScanCopiesScansSelectSignatories;
