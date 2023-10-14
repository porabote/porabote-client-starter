import React, {useState, useEffect} from "react";
import {ModelDataSource} from "@/app/DataSources";
import {Form, Field, Select, Input, Button} from "@/app/form";
import ApiUsers from "../../users/models/ApiUsers";
import Payments from "@/components/payments/models/Payments";
import Entity, {IEntity} from "../../../app/models/entity";

type PickedListProps = {
  entity_id: number;
  event_ids: number[];
};

const PickedListAddForm = (props: PickedListProps) => {

  const getEntity = () => {
    return Payments.createEntity({
      user_ids: [],
      access_list_id: props.entity_id,
    });
  };

  const [entity, setEntity] = useState(() => getEntity());

  useEffect(() => {
    getEntity();
  }, []);

  const fetchUsers = async () => {
    let users = await new Payments()
      .setWhere({access_list_id: props.entity_id})
      .get();
    console.log(users);

    // let users_list: {} = {};
    //
    // data.data.map(item => {
    //     users_list[item.id] = item;
    // })
    //
    // setState({
    //     users: (typeof data.data !== "undefined") ? data.data : [],
    //     users_list
    // })

  }


  //if (users.length == 0) return <p>Данные загружаются...</p>;

  const onSubmit = (entity: IEntity) => {
    let attributes = entity.getAttributes();

    let records: IEntity[] = [];
    attributes.user_ids.map((user_id: number) => {
      let newRecord: IEntity = Payments.createEntity( {
        user_id: user_id,
        access_list_id: props.entity_id,
      });
      records.push(newRecord);
    });

    Payments.save(records);
  }

  return (
    <div>
      <Form
        entity={entity}
        onSubmit={onSubmit}
      >
        <Field>
          <Select
            name="user_ids"
            label="Пользователи"
            isMiltiple={true}
            optionTitle={(record: { attributes: { name: string, post_name: string } }) => {
              return `${record.attributes.name} - ${record.attributes.post_name}`
            }}
            setData={async () => {
              return await ModelDataSource({
                model: ApiUsers,
              });
            }}
            setTagTitle={(tagValue: number, dataStorage: any[], dataStorageMap: any[]) => {
              let dataIndex = dataStorageMap[tagValue];
              let record = dataStorage[dataIndex];
              return (`${record.attributes.name} (${record.attributes.post_name})`)
            }}
          />
        </Field>

        <div className="buttons-panel">
          <Field>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              style={{width: "140px", marginTop: "20px"}}
            />
          </Field>
        </div>
      </Form>
    </div>
  );


}

export default PickedListAddForm;
