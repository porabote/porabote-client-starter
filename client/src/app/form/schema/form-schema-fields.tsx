import React, {useContext} from 'react';
import {FormContext} from "@/app/form/form";

const FormSchemaFields = () => {

  const {schema} = useContext(FormContext);

  const renderFields = () => {
    let fields = [];
    schema.getFields().map((field) => {
      fields.push(field.render());
    });
    return fields;
  }

  return (
    <>
      {renderFields()}
    </>
  );
};

export default FormSchemaFields;