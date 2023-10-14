import React from 'react';

const TextEditorArea = (props) => {

  return (
    <div>
        <div
          ref={props.textAreaRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          name="msg"
          placeholder="Напишите ваш комментарий"
          className="text-editor-area"
          dangerouslySetInnerHTML={{__html: props.value}}
          onInput={(e) => {
            if (typeof props.onInput == "function") props.onInput(e, {...props});
          }}
        >
        </div>

    </div>
  );
};

export default TextEditorArea;
