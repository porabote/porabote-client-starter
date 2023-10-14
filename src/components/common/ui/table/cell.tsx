import React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

type propsTypes = {
  children: ReactJSXElement[] | ReactJSXElement
  class: string;
  style: { [key: string]: React.CSSProperties };
}
const Cell = (props: propsTypes) => {
  return (
    <div className={`prb-table__cell ${props.class || ''}`} style={props.style || {}}>
      {props.children}
    </div>
  );
}
export default Cell;