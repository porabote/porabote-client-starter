import React from "react";

type propsTypes = {
  children: React.ReactNode;
  class?: string;
  style?: { [key: string]: React.CSSProperties };
}
const Cell = (props: propsTypes) => {
  return (
    <div className={`prb-table__cell ${props.class || ''}`} style={props.style || {}}>
      {props.children}
    </div>
  );
}
export default Cell;