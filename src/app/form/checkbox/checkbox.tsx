import React, {MouseEventHandler, useState, useEffect} from 'react';
import {FieldChildType} from "../Field/FieldTypes";
import "./checkbox.less";

const Checkbox = (props: FieldChildType) => {

  const [isChecked, setIsChecked] = useState(props.value ? true : false);
  const [htmlFor, setHtmlFor] = useState(`checkbox-${Math.random()}`);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {

    if (props.value != value) {
      changeStatus(!!props.value, null);
    }
  }, [props.value]);//props.value


  let disabled: boolean | undefined = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(props.value);
  } else if (props.disabled) {
    props.disabled ? props.disabled : false;
  }

  const changeStatus = async (status: boolean | null = null, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement> | null) => {

    let newStatus = status ? 1 : 0;

    // If first init
    if (typeof status != "boolean") {
      newStatus = (!!props.value && props.value.length) ? 1 : 0;
    }

    setIsChecked(newStatus ? true : false);

    if (props.formContext) {
      props.formContext.setAttribute(props.name, newStatus);
    }

    setValue(newStatus);

    if (typeof status != "boolean") {
      return;
    }

    if (typeof props.onSelect == "function" && event) {
      let callbackResult: {[key: string]: any} | undefined = await props.onSelect(event, {...props, status});
      if (typeof callbackResult != "undefined") {
        setIsChecked(callbackResult.status);
      }
    }


  }

  return (
    <div className={props.className ? `${props.className}-wrap` : "form-item__checkbox-wrap"}>
      <input
        type="checkbox"
        id={htmlFor}
        className={props.className || 'form-item__checkbox'}
        disabled={disabled}
        name={props.name}
        value={props.value || ""}
        checked={isChecked}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          const { currentTarget } = event;
          if (currentTarget) {
            const ischecked = !!(event.currentTarget.checked);
            changeStatus(ischecked, event);
          }
        }}
        onChange={e => {
          //let status = (e.target.checked) ? 1 : 0
        }}
      />
      <label htmlFor={htmlFor}>{props.label}</label>
    </div>
  )
}

export default Checkbox;
