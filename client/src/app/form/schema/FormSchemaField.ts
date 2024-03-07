import React, {createElement, FC} from "react";
import {FieldType, SchemaFieldType} from "@/app/form/types";
import Input from "../Input/Input";
import Select from "../Select/Select";

class FormSchemaField {

  component: FC;
  props;

  init = (props: FieldType) => {

    props.placeholder = props.placeholder ? props.placeholder[props.lang] : "";
    props.label = props.label ? props.label[props.lang] : "";

    this.props = props;
    this.createComponent();

    return this;
  }

  createComponent = () => {
    if (this.props.component == "input") {
      this.component = createElement(Input, this.props);
    } else if (this.props.component == "select") {
      this.component = createElement(Select, this.props);
    }
  }

  setProp = (propName, value) => {
    const newProp = {};
    newProp[propName] = value;
    this.props = Object.assign({...this.props}, newProp);
    this.createComponent();
  }

  render = () => {
    return this.component;
  }

}

export default FormSchemaField;