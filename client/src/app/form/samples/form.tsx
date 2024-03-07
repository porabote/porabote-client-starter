import React, {useState, useEffect} from 'react';
import {Form, Field, Button, Input, Select} from "/app/form";
import {DoneIcon} from "@/app/ui/icons";
import Observers from "@/components/observers/models/Observers";

const TestComponent = (props) => {

  const [selectedObserver, setSelectedObserver] = useState(null);

  const getObservers = async () => {
    let observersList = await new Observers()
      .setWhere({business_event_id: 27, entity_id: props.recordId})
      .setWith(['user'])
      .get();

    if (observersList.data.length > 0) {
      let lastRecord = observersList.data[observersList.data.length - 1];
      setSelectedObserver(lastRecord.attributes.user_id);
    }

    return observersList.data;
  }

  const submit = async (entity) => {
    console.log(entity.attributes);
  }

  return (
    <div>

      <Form
        setEntity={() => Observers.createEntity({user_id: null})}
        onSubmit={submit}
      >

        <div className="form-fieldset" style={{gridTemplateColumns: "100%"}}>
          <Field>
            <Select
              name="user_id"
              value={selectedObserver}
              label="Подписант"
              setData={async () => {
                return  await getObservers();
              }}
              onSelect={(newValue, formContext, props, dataStorage, dataStorageMap) => {
                // let object_name = dataStorage[dataStorageMap[newValue]].attributes.name;
                // formContext.setAttribute("object_name", object_name);
              }
              optionValueKey="attributes.user_id"
              optionTitle={(record) => {
                let user = record.relationships.user.attributes;
                return `${user.name} - ${user.post_name}`;
              }}
            />
          </Field>

          <Field>
            <Button label="Выбрать" style={{width: '140px', marginTop: '32px'}}>
              <DoneIcon style={{
                fill: "#9ba6b8",
                paddingRight: "10px",
                width: "24px",
                height: "24px",
              }}/>
            </Button>
          </Field>

        </div>

      </Form>

    </div>
  );
};

export default TestComponent;
