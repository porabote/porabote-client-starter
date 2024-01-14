import React from "react";
import Cell from "./cell";

type propsTypes = {
  children: JSX.Element[] | JSX.Element;
  class: string;
  gridTemplateColumns: string;
}
const Row = (props: propsTypes) => {

  return (
    <div
      className={typeof props.class == "undefined" ? "prb-row" : `prb-row ${props.class}`}
      style={{gridTemplateColumns: props.gridTemplateColumns}}
    >
      {React.Children.map(props.children, (cell, index) => {
        if (!cell) return;
        return <Cell {...cell.props} />;
      })}
    </div>
  );
}

export default Row