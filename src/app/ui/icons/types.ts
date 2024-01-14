import {MouseEventHandler, ReactElement} from "react";

export type IconType = {
  size?: number;
  fill?: string;
  className?: string;
  fillHover?: string;
  style?: {[key: string] : any};
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactElement<any, string | React.JSXElementConstructor<any>>;
}