import React from 'react';
import TextEditorPanel from "./text-editor-panel";
import TextEditorArea from "./text-editor-area";
import "./style.less";

const TextEditor = (props) => {

  return (
    <div className="text-editor">
      <TextEditorPanel {...props} name={props.name} formContext={props.formContext}/>
      <TextEditorArea {...props} name={props.name} formContext={props.formContext}/>
    </div>
  );
};

export default TextEditor;
