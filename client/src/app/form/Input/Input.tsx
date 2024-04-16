import React, {ChangeEvent, useState, useEffect, useContext, createElement, useRef} from 'react';
import {FormContext} from "@/app/form";
import {FloatType} from "@/app/types";
import {FieldChildType} from "../types";

type InputType = {
  icons?: any[];
};

const Input = (props: FieldChildType<InputType>) => {

  const inputRef = useRef(null);

  let context = useContext(FormContext);

  const initValue = () => {
    let value = "";
    if (props.value) {
      value = props.value || "";
    } else if (context) {
      value = context.getValue(name) || "";
    }

    if (props.format) {
      value = props.format.handler(value);
    }

    return value;
  }

  const [name] = useState(props.name || "");
  const [value, setValue] = useState(initValue());
  const [inputType, setInputType] = useState(props.type || 'string');

  const cursorPos = useRef(value.length);
  const currentValueLength = useRef(0);
  const countSpacesInLeftPart = useRef(0);

  const htmlFor = `${inputType}-${Math.random()}`;

  let label = (typeof props.label != "undefined") ?
    <label htmlFor={htmlFor} className="form_item__label">{props.label}</label> : "";

  let disabled = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(context);
  } else if (typeof props.disabled != "undefined") {
    disabled = props.disabled;
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (props.format) {
      newValue = props.format.handler(e.target.value);
    }

    cursorPos.current = e.target.selectionStart;

    setValue(newValue);
    context.setValue(name, setTypeFormat(newValue));
  }

  useEffect(() => {
    setCursorPositionAfterChange();
  }, [value]);

  const setCursorPositionAfterChange = () => {

    if (!props.format) return;
    if (inputRef === null) return;
    if (inputRef.current === null) return;

    let delta = value.length - currentValueLength.current;
  //  console.log(delta);
    delta = (delta > 0) ? delta - 1 : delta + 1;
//console.log(value.length, currentValueLength.current, cursorPos.current, delta);
    inputRef.current.setSelectionRange(cursorPos.current + delta, cursorPos.current + delta);

    currentValueLength.current = value.length;
  }


  // removeInvalidCharacters(event) {
  //   const regex = /[|&;$%@"<>()+,]/g;
  //   const text = event.target.value;
  //   if (text.match(regex)) {
  //     event.target.selectionStart = event.target.selectionStart - 1;
  //     event.target.selectionEnd = event.target.selectionEnd - 1;
  //   }
  //   return text.replace(regex, "");
  // }

  const clickHandler = (e) => {
    cursorPos.current = inputRef.current.selectionStart;
    currentValueLength.current = value.length;

    let leftPart = value.toString().substr(0, cursorPos.current);
    countSpacesInLeftPart.current = leftPart.split(" ").length - 1;
  }

  const setTypeFormat = (rawValue: string) => {
    let value = rawValue;
    switch (inputType) {
      case "float":
        value = FloatType(rawValue);
    }

    return value || "";
  }

  let input = <input
    ref={inputRef}
    type={inputType}
    placeholder={props.placeholder}
    id={htmlFor}
    name={name}
    value={value}
    disabled={disabled}
    className={props.class || 'form_item__input'}
    autoComplete="off"
    onChange={onChangeInput}
    onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
      if (typeof props.onChange !== "function") {
        return;
      }
      props.onChange(e, {...props, newValue: e.target.value});
    }}
    onClick={clickHandler}
  />;

  if (props.type == "hidden") {
    return input;
  }

  const errors = context.validationErrors[props.name];

  return (
    <div className={`form_item ${props.classModifier ? props.classModifier : ''}`}>
      {label}
      <div className="form_item__input_wrap">
        {input}
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
      {errors &&
        <div className="form_item__input_error">{Object.keys(errors).map(errorType => {
          return <span key={errorType}>{errors[errorType]}</span>
        })}</div>
      }
    </div>
  );
};

export default Input;
