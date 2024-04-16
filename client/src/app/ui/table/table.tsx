import React, {Component} from "react";
import Row from "./row";
import "./table.less";

type propsTypes = {
  children: JSX.Element[] | JSX.Element;
  class?: string;
  gridTemplateColumns: string;
}

const Table = (props: propsTypes) => {
  return (
    <div className="prb-table-wrap">
      <div className={props.class ? `prb-table ${props.class}` : `prb-table`}>
        {React.Children.map(props.children, (child, index) => {
          return React.cloneElement(child, {
            ...props,
            ...child.props,
          });
        })}
      </div>
    </div>
  );
}

export default Table;