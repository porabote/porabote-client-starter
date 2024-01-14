import React, {useEffect, useState} from 'react';
import {FormProvider} from "./FormContext";
import IModel from "../models/i-model";
import Entity, {IEntity} from "../models/entity";
import "./Form.less";

interface FormProps {
  method: string;
  model: IModel;
  entity: IEntity;
  children: React.ReactNode[];
  onSubmit?: (entity: IEntity) => {};
  initValues: {};
  setEntity: Function;
}

const Form = ({model, initValues, setEntity, children, onSubmit, method = "POST"}: FormProps) => {

  let initEntity: IEntity = new Entity(model, initValues);

  const [entity, setFormEntity] = useState(initEntity);
  const [formKey, setFormKey] = useState(0);

  try {

    useEffect(() => {
      initEntity();
    }, []);

    const initEntity = async () => {
      let entity = null;

      if (typeof setEntity == "function") {
        entity = setEntity();
      }

      setFormEntity(entity);
    }

    const submit = (): void => {

      if (!entity) return;

      if (typeof onSubmit == "function") {
        onSubmit(entity);
      } else {
        entity.save();
      }
    }

    const setAttribute = (attributeName: string, value: any, mode?: string): void => {

      if (!entity) return;

      if (!mode) mode = 'merge';

      entity.setAttribute(attributeName, value, mode);
      let randomValue = Math.random() * 1000;
      setFormKey(randomValue); // For form rerender
    }

    if (!entity) return <span>Загрузка</span>;

    return (
      <FormProvider value={{
        entity,
        setAttribute,
        // updateFormEntity,
        submit,
      }}>
        {children}
      </FormProvider>
    );
  } catch (e) {
    console.log(e);
  }
}

export default Form;
