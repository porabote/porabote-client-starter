import React, {useState} from 'react';
import "./Icon.less";

const Icon = (props) => {

  const size = props.size || "16";
  const fill = props.fill || "#252525";
  const fillHover = props.fillHover || "#1378ff";

  const [isHovered, setIsHovered] = useState(false);

  let [style] = useState(Object.assign(
    {...props.style} || {},
    {width: `${size}px`, height: `${size}px`}
  ));

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="icon-prb"
      onClick={props.onClick}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(props.children, {
        style,
        size,
        fill: isHovered ? fillHover : fill,
      })}
    </div>
  );
};

export default Icon;
