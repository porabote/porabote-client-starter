import React, {MouseEvent, useState} from 'react';
import {FormContextInterface} from "../FormContext";
import Icon, {LoaderClockIcon} from "@/app/ui/icons";
import "./Button.less";
import {FieldChildType} from "../Field/FieldTypes";

type buttonProps = {
  icon?: string;
  isVisible?: Function;
  setIsButtonLoading: any;
};

const loaderIcon = <Icon><LoaderClockIcon/></Icon>

const Button = (props: FieldChildType<buttonProps> & {children?: React.ReactChildren}) => {

  const [className, setClassName] = useState(props.className || "prb-button yellow");
  const [label, setLabel] = useState(props.label || "Сохранить");
  const [icon, setIcon] = useState(props.icon || loaderIcon);
  const [style, setStyle] = useState(props.style || {});
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (props.formContext && typeof props.onClick != "function") {
      props.formContext.submit();
    } else {
      if (!isButtonLoading && typeof props.onClick !== "undefined") {
        props.onClick(event, {...props, elementProps: {setIsButtonLoading}});
      }
    }
  }

  let isVisible = typeof props.isVisible != "undefined" ? props.isVisible({...props}) : true;

  if (!isVisible) {
    return <></>
  }

  return (
    <div className="prb-button-wrap">
      <div
        className={`${className} ${isButtonLoading ? "" : ""}`}
        style={{
          backgroundImage: icon ? `url(${icon})` : "none",
          ...style,
        }}
        onClick={handleClick}
      >
        {isButtonLoading && loaderIcon}
        {props.children}
        {label}
      </div>
    </div>
  );
};

export default Button;
