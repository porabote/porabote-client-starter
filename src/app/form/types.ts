import React, {CSSProperties} from "react";

export type FormContextType = {
  onSubmit: (context: FormContextType) => any;
  getValue: (name: string) => any;
  setValue: (name: string, value: any, mode?: string) => any;
  values: {[key: string]: any};
};

export type FormType = {
  method?: string;
  children: React.ReactNode[];
  onSubmit?: (context: FormContextType) => void;
  initValues?: {[key: string]: any};
}

export interface FieldPropsType {
  children: React.ReactElement;
}

export type ButtonPropsElementType = {
  icon?: string;
  isVisible?: Function;
  setIsButtonLoading: Function;
  onSubmit: (context: FormContextType) => void;
};

export type ButtonPropsType = Omit<FieldChildType<ButtonPropsElementType> & {children?: React.ReactChildren}, "name"> ;

export type FieldChildType<E> = {
  children?: React.ReactElement | React.ReactNode;
  formContext?: FormContextType;
  name?: string;
  label?: string;
  optionValueKey?: string;
  optionsTitle?: any;
  placeholder?: string;
  disabled?: boolean | Function;
  value?: any;
  type?: string;
  class?: string;
  elementProps?: E;
  className?: string;
  style?: CSSProperties;
  status?: boolean;
  isVisible?: Function;
  icon?: any;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>, params: FieldChildType<E>) => void;
  onChange?: (value: string | number | boolean, formContext: FormContextType, params: FieldChildType<E>) => void;
  onInput?: (e: React.KeyboardEvent<HTMLInputElement> | string, params: FieldChildType<E>) => void;
  onSelect?: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, params: FieldChildType<E>) => any
  onClick?: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>, params: FieldChildType<E>) => any;
};

export type SelectType = {
  buttons?: [];
  children?: React.ReactElement[];
  dataStorage?: any[];
  emptyTitle?: string;
  formContext: FormContextType;
  isEmpty?: boolean;
  isMultiple?: boolean;
  label: string;
  name: string;
  onSelect?: (
    newValue: any,
    formContext: FormContextType,
    props: SelectType,
    dataStorage: any[],
    dataStorageMap: any[]
  ) => void | null | undefined;
  optionTitle: (record: { attributes: {}, relationships: {} }) => string;
  optionValueKey?: string | number;
  options: { props: OptionType }[] | [];
  setData: () => { [key: string]: any; }[];
  setTagTitle?: (value: number | string, dataStorage: any[], dataStorageMap: {}) => string;
  value: string | number | number[] | Set<any> | null;
}

export type OptionType = {
  children: string;
  selected?: boolean;
  value: string | number;
  key: number | string;
  isMultiple?: boolean;
  onSelect?: (value: any, props: OptionType, mouseEvent: React.MouseEvent<HTMLDivElement>) => any;
  onSelectMultiple?: (value: any, props: OptionType, mouseEvent: React.MouseEvent<HTMLDivElement>) => any;
  dataStorage?: any[];
  dataStorageMap?: any[];
};