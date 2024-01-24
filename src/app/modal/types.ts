import {Component, FC, ReactElement} from "react";

export type modalItemProps = {
  itemkey: number;
  activeItemKey: number;
  key: number,
  title: string;
  content: ReactElement<any>;
};

export type modalStateProps = {
  items: modalItemProps[];
  isOpen: boolean;
  activeItemKey: number;
};

export type contentType = (FC | Component | Element | ReactElement);