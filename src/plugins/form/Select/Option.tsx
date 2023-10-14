import React, {useState, MouseEvent} from 'react'

export type OptionProps = {
  children: string;
  selected: boolean;
  value: string;
  key: number | string;
  isMultiple:  boolean;
  onSelect?: (value: any, props: OptionProps, mouseEvent: React.MouseEvent<HTMLDivElement>) => any;
  onSelectMultiple?: (value: any, props: OptionProps, mouseEvent: React.MouseEvent<HTMLDivElement>) => any;
  dataStorage: any[];
  dataStorageMap: any[];
};

export type IOption = (props: OptionProps) => JSX.Element;

const Option: IOption = (props: OptionProps) => {

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
      className="form-item__select__drop-link"
    >
      {props.children}
    </div>
  )
}

export default Option;
