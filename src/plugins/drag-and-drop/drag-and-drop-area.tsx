import React from 'react';
import DragAndDropItem from "./drag-and-drop-item";

const DragAndDropArea = (props) => {

  const rederChildren = () => {
    return React.Children.map(props.children, (child, i) => {
      if (child.props.draggable) {
        return(
          <DragAndDropItem top={child.props.top || 0} left={child.props.left || 0} onStop={props.onStop || null}>
            {child}
          </DragAndDropItem>
        );
      } else {
        return child;
      }
    });
  }

  return (
    <div className="prb-drag-and-drop_area">
      {rederChildren()}
    </div>
  );
};

export default DragAndDropArea;
