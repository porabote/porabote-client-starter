import React, {ChangeEvent, useState, useEffect, useContext, createElement, useRef} from 'react';
import formContext from "../FormContext";
import {FloatType} from "@/app/types";
import {FieldChildType} from "../types";

type InputType = {
  icons?: any[];
};

const Input = (props: FieldChildType<InputType>) => {

  useEffect(() => {}, []);

  const inputRef = useRef(null);
  let context = useContext(formContext);

  const [name] = useState(props.name || "");

  const [inputType, setInputType] = useState(props.type || 'string');

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
    context.setValue(name, setTypeFormat(newValue));
  }

  const setTypeFormat = (rawValue: string) => {
    let value = rawValue;

    switch (inputType) {
      case "float":
        value = FloatType(rawValue);
    }

    return value || "";
  }

  // const onCLickByIcon = (e) => {
  //   setInputType('text');
  // }

  let value = context.getValue(name);

  return (
    <div className="form_item">
      {label}
      <div className="form_item__input_wrap">
        <input
          ref={inputRef}
          type={inputType}
          placeholder={props.placeholder}
          id={htmlFor}
          name={name}
          value={setTypeFormat(value)}
          disabled={disabled}
          className={props.class || 'form_item__input'}
          autoComplete="off"
          onChange={onChangeInput}
          onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (typeof props.onInput !== "function") {
              return;
            }
            props.onInput(e.target.value, {...props});
          }}
        />

        {props.elementProps && props.elementProps.icons &&
          props.elementProps.icons.map((item, index) => {
            return React.cloneElement(item, {
              ...item.props,
              key: index,
              setInputType,
            });
          })
        }

      </div>
    </div>
  );
};

export default Input;
