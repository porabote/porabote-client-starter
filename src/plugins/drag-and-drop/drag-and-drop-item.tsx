import React, {useState, useRef} from 'react';

const DragAndDropItem = (props) => {

  const dragObject = useRef(null);

  const [top, setTop] = useState(props.top);
  const [left, setLeft] = useState(props.left);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  const [isDragStarted, setIsDragStarted] = useState(false);

  return (
    <div
      ref={dragObject}
      className="prb-drag-and-drop_item"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      // Prevet browser's event by default
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
      onMouseDown={(e) => {
        setIsDragStarted(true);
        setShiftX(e.clientX - left);
        setShiftY(e.clientY - top);
      }}
      onMouseMove={(e) => {

        if (isDragStarted) {
          setLeft(e.clientX - shiftX);
          setTop(e.clientY - shiftY);
        }
      }}
      onMouseUp={(e) => {
        setIsDragStarted(false);
        if (typeof props.onStop == "function") {
          props.onStop(e, top, left, {...props.children.props});
        }
      }}
    >
      {props.children}
    </div>
  );
};

export default DragAndDropItem;
