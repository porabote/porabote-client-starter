import React, {useContext} from 'react';
import {FormContext} from "@/app/form";
import {FieldPropsType} from "../types";

const Field = (props: FieldPropsType) => {

  let context = useContext(FormContext);

  const name = props.children.props.name;

  let value = "";
  // If set value by default
  if (typeof props.children.props.value != "undefined") {
    value = props.children.props.value;
  } else {

    value = context.getValue(name);

    if (typeof value == "undefined") {
      context.setValue(name, "");
    }
  }

  return React.cloneElement(props.children, {
    key: name,
    value,
    context,
    props,
  });

}

export default Field;
