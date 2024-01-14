import {FormContextInterface} from "../FormContext";
import React, {CSSProperties} from "react";

export interface FieldInterface {
  children: React.ReactElement;
}

export type FieldChildType<E> = {
  formContext?: FormContextInterface;
  name: string;
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
  onChange?: (value: string | number | boolean, formContext: FormContextInterface, params: FieldChildType<E>) => void;
  onInput?: (e: React.KeyboardEvent<HTMLInputElement> | string, params: FieldChildType<E>) => void;
  onSelect?: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, params: FieldChildType<E>) => any
  onClick?: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>, params: FieldChildType<E>) => any;
};