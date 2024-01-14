import React, {ChangeEvent, useState, useEffect, useContext} from 'react';
import FormContext, {FormContextInterface} from "../FormContext";
import {FloatType} from "@/app/types";
import {FieldChildType} from "../Field/FieldTypes";

const Input = (props: FieldChildType) => {

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

  const setTypeFormat = (rawValue: string) => {
    let value = rawValue;

    switch (inputType) {
      case "float":
        value = FloatType(rawValue);
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
          onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (typeof props.onInput !== "function") {
              return;
            }
            props.onInput(e.target.value, {...props});
          }}
        />
      </div>
    </div>
  );
};

export default Input;
