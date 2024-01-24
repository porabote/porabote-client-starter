import React, {useContext, useState} from 'react';
import Icon, {LoaderClockIcon} from "@/app/ui/icons";
import {ButtonPropsType} from "../types";
import formContext from "../FormContext";

const loaderIcon = <Icon><LoaderClockIcon/></Icon>

const Button = (props: ButtonPropsType) => {

  let context = useContext(formContext);

  const [className, setClassName] = useState(props.className || "prb-button");
  const [label, setLabel] = useState(props.label || '');
  const [icon, setIcon] = useState(props.icon || loaderIcon);
  const [style, setStyle] = useState(props.style || {});
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (props.type == "submit") {
      context.onSubmit(context);
    } else {
      if (!isButtonLoading && typeof props.onClick !== "undefined") {
        props.onClick(event, props);
      }
    }
  }

  let isVisible = typeof props.isVisible != "undefined" ? props.isVisible({...props}) : true;

  if (!isVisible) {
    return <></>
  }

  return (

      <div
        className={`${className} ${isButtonLoading ? "" : ""}`}
        style={{
          backgroundImage: icon ? `url(${icon})` : "none",
          ...style,
        }}
        onClick={handleClick}
      >
        {isButtonLoading && loaderIcon}
        {props.children &&
          props.children
        }
        {label}
      </div>

  );
};

export default Button;
