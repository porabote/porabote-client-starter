import React from 'react';

const TextArea = (props) => {
  return (
    <div className="form-item__textarea-wrap">
    <textarea
      className={props.className || "form-textarea"}
      value={props.value}
      placeholder={props.placeholder || ''}
      onChange={(e) => {
        props.formContext.setAttribute(props.name, e.target.value)
      }}
      onInput={(e) => {
        if (typeof props.onInput == "function") {
          props.onInput(e.target.value, {...props});
        }
      }}
    />
    </div>
  );
};

export default TextArea;
