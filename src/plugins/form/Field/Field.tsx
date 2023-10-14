import React, {useContext} from 'react';
import FormContext, {FormContextInterface} from '../FormContext';

interface FieldInterface {
  formContext: FormContextInterface,
  name: string,
  children: React.ReactElement,
  label: string,
  optionValueKey?: string
  optionsTitle?: any
};

const Field = (props: FieldInterface) => {

  let context = useContext(FormContext);

  const key = props.children.props.name;

  let value = "";
  // If set value by default
  if (typeof props.children.props.value != "undefined") {
    value = props.children.props.value;
  } else if (context.entity) {

    let name = (props.children.props.name) ? props.children.props.name : "";

    value = context.entity!.getAttribute(name);

    if (!value) {
      context.entity!.setAttribute(name, "");
    }
  }

  return React.cloneElement(props.children, {
    key,
    value,
    props,
    formContext: context,
  });

}

export default Field;
