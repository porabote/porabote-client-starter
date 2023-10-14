import React, {useEffect, useState} from 'react';
import {FormProvider} from "./FormContext";
import IModel from "../../app/models/i-model";
import Entity, {IEntity} from "../../app/models/entity";
import "./Form.less";

interface FormProps {
  model: IModel;
  entity: IEntity;
  setEntity?: () => IEntity;
  children: React.ReactNode[];
  onSubmit?: (entity: IEntity) => {};
  initValues?: any[];
}

const Form = ({
                model,
                initValues,
                children,
                onSubmit,
                setEntity,
              }: FormProps) => {

  const [entity, setFormEntity] = useState(null);
  const [formKey, setFormKey] = useState(null);
  const [preloadText, setPreloadText] = useState("");

  try {
    useEffect(() => {
      initEntity();
    }, []);

    const initEntity = async () => {
      let entity;
      if (typeof setEntity == "function") {
        entity = setEntity();
      } else {
        entity = new Entity(model, initValues);
        await entity.loadRecord();
      }
      setFormEntity(entity);
    }

    const submit = () => {
      if (typeof onSubmit == "function") {
        onSubmit(entity);
      } else {
        entity.save();
      }
    }

    const setAttribute = (attributeName: string, value: any, mode?: string): void => {

      if (!mode) mode = 'merge';

      entity.setAttribute(attributeName, value, mode);
      setFormKey(Math.random() * 1000);
    }

    if (!entity) {
      setPreloadText("Загрузка");
    } else {
      setPreloadText("");
    }

    return (
      <FormProvider value={{
        entity,
        setAttribute,
        submit,
        preloadText,
      }}>
        {children}
      </FormProvider>
    );
  } catch (e) {
    console.log(e);
  }
}

export default Form;
