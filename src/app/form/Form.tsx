import React, {useEffect, useState} from 'react';
import {FormContextType, FormType} from "./types";
import ObjectMapper from "../collections/ObjectMapper";
import FormContext from "./FormContext";

const Form = ({initValues = {}, children, onSubmit, method = "POST"}: FormType) => {

  const [values, setValues] = useState(initValues);
  //const [formKey, setFormKey] = useState(0);


  useEffect(() => {
  }, []);

  const onSubmitHandler = (context: FormContextType) => {
    if (onSubmit) {
      onSubmit(context);
    }
  }

  const setValue = (name: string, value: any, mode: string  = 'merge'): void => {

    //if (!mode) mode = 'merge';

    let newValues = ObjectMapper.setValue(name, value, values, mode);

    setValues({...newValues});

    //let randomValue = Math.random() * 1000;
    //setFormKey(randomValue); // For form rerender
  }

  const getValue = (name: string) => {
    return ObjectMapper.getValueByPath(name, values);
  }

  const initFormContextValues = {
    values,
    getValue,
    setValue,
    onSubmit: onSubmitHandler,
  }

  const { Provider: FormProvider, Consumer: FormConsumer } = FormContext;

  return (
    <FormProvider value={{...initFormContextValues}}>
      {children}
    </FormProvider>
  );

}

export default Form;
