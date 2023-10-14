import React, {MouseEventHandler, useState, useEffect} from 'react';
import {FormContextInterface} from '../FormContext';
import "./checkbox.less";

interface checkBoxProps {
  name: string;
  label: string;
  class: string;
  checked: boolean;
  value: any;
  disabled: boolean | ((value: any) => boolean);
  onSelect: (status: boolean, formContext: FormContextInterface) => {};
  formContext: FormContextInterface;
}

const Checkbox = (props: checkBoxProps) => {

  const [isChecked, setIsChecked] = useState(props.value ? true : false);
  const [name] = useState(props.name || "");
  const [htmlFor, setHtmlFor] = useState(`checkbox-${Math.random()}`);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {

    if (props.value != value) {
      changeStatus(!!props.value ? props.value ? true : false : null);
    }
  }, [props.value]);//props.value

  let disabled = props.disabled ? props.disabled : false;

  if (typeof disabled === "function") {
    disabled = disabled(props.value);
  }

  const changeStatus = async (status: boolean | null = null) => {

    let newStatus = status ? 1 : 0;

    // If first init
    if (typeof status != "boolean") {
      newStatus = (!!props.value && props.value.length) ? 1 : 0;
    }

    setIsChecked(newStatus ? true : false);

    props.formContext.setAttribute(props.name, newStatus);

    if (typeof status == "boolean") {
      if (typeof props.onSelect == "function") {
        let callbackResult = await props.onSelect(status, props.formContext);
        if (typeof callbackResult != "undefined") {
          setIsChecked(callbackResult.status);
        }
      }
    }

    setValue(newStatus);
  }

  return (
    <div className={props.className ? `${props.className}-wrap` : "form-item__checkbox-wrap"}>
      <input
        type="checkbox"
        id={htmlFor}
        className={props.className || 'form-item__checkbox'}
        disabled={disabled}
        name={name}
        value={props.value || ""}
        checked={isChecked}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => changeStatus(!!(event.target.checked))}
        onChange={e => {
          let status = (e.target.checked) ? 1 : 0
        }}
      />
      <label htmlFor={htmlFor}>{props.label}</label>
    </div>
  )
}

export default Checkbox;
