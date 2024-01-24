import React, {useState, MouseEvent} from 'react'
import {OptionType} from "../types";

export type IOption = (props: OptionType) => JSX.Element;

const Option: IOption = (props: OptionType) => {

  const [value, setValue] = useState(props.value);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!props.isMultiple && typeof props.onSelect == "function") {
      props.onSelect(value, props.children, e, props.dataStorage, props.dataStorageMap);
    } else if (props.isMultiple && typeof props.onSelectMultiple == "function") {
      props.onSelectMultiple(value, props, e, props.dataStorage, props.dataStorageMap);
    }
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="form-item__select__drop-link">
      {props.children}
    </div>
  )
}

export default Option;
