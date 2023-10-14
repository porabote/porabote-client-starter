import React, {ChangeEvent, useState, useEffect, useContext} from 'react';
import FormContext, {FormContextInterface} from "../FormContext";
import {FloatType} from "../../../app/types";

interface InputProps {
  formContext: FormContextInterface;
  name: string | undefined;
  label: string | undefined;
  type: string | undefined;
  placeholder: string | undefined;
  disabled: (formContext: FormContextInterface) => any;
  mask: (value: any) => any;
  class: string | undefined;
  value: string | number;
}

const Input = (props: InputProps) => {

  let context = useContext(FormContext);

  const [name] = useState(props.name || "");

  const inputType = props.type || 'string';
  const htmlFor = `${inputType}-${Math.random()}`;

  let label = (typeof props.label != "undefined") ?
    <label htmlFor={htmlFor} className="form_item__label">{props.label}</label> : "";

  let disabled = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(props.formContext);
  } else if (typeof props.disabled != "undefined") {
    disabled = props.disabled;
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    context.setAttribute(name, setTypeFormat(newValue));
  }

  const setTypeFormat = (rawValue) => {
    let value = rawValue;

    switch (inputType) {
      case "float": value = FloatType(rawValue);
    }

    return value || "";
  }

  return (
    <div className="form_item">
      {label}
      <div className="form_item__input_wrap">
        <input
          type={inputType}
          placeholder={props.placeholder}
          id={htmlFor}
          name={name}
          value={setTypeFormat(props.value)}
          disabled={disabled}
          className={props.class || 'form_item__text'}
          autoComplete="off"
          onChange={onChangeInput}
          onInput={(e) => {
            if (typeof props.onInput == "function") {
              props.onInput(e.target.value, {...props});
            }
          }}
        />
      </div>
    </div>
  );
};

export default Input;
