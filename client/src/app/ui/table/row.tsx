import React from "react";
import Cell from "./cell";
import {useNavigate} from "react-router-dom";

type propsTypes = {
  children: JSX.Element[] | JSX.Element;
  class?: string;
  gridTemplateColumns?: string;
  linkTo?: string;
}
const Row = (props: propsTypes) => {

  const navigate = useNavigate();

  const onClickHandle = (e) => {
    if (props.linkTo) {
      navigate(props.linkTo);
    }
  }

  return (
    <div
      className={typeof props.class == "undefined" ? "prb-row" : `prb-row ${props.class}`}
      style={{gridTemplateColumns: props.gridTemplateColumns}}
      onClick={onClickHandle}
    >
      {React.Children.map(props.children, (cell, index) => {
        if (!cell) return;
        return <Cell {...cell.props} />;
      })}
    </div>
  );
}

export default Row