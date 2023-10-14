import React, {useState} from 'react';
import {FormContextInterface} from "../FormContext";
import Icon, {LoaderClockIcon} from "../../../components/common/ui/icons";
import "./Button.less";

type buttonProps = {
  label: string;
  className: string;
  icon: string;
  style: { [key: string]: string | number };
  formContext: FormContextInterface;
};

const loaderIcon = <Icon><LoaderClockIcon/></Icon>

const Button = (props: buttonProps) => {

  const [className, setClassName] = useState(props.className || "prb-button yellow");
  const [label, setLabel] = useState(props.label || "Сохранить");
  const [icon, setIcon] = useState(props.icon || loaderIcon);
  const [style, setStyle] = useState(props.style || {});
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (props.formContext && typeof props.onClick != "function") {
      props.formContext.submit();
    } else {
      if (!isButtonLoading) {
        props.onClick({...props, setIsButtonLoading});
      }
    }
  }

  let isVisible = typeof props.isVisible != "undefined" ? props.isVisible({...props}) : true;

  if (!isVisible) {
    return <></>
  }
  ;

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
