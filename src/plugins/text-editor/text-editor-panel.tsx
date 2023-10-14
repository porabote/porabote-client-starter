import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modal from "/src/plugins/modal";
import InsertImageForm from "./forms/insert-image-form";
import Bold from "./buttons/bold";
import Italic from "./buttons/italic";
import Underline from "./buttons/underline";
import Clear from "./buttons/clear";
import Image from "./buttons/image";

const TextEditorPanel = (props) => {


  const wrapInTag = (e, tagAlias) => {

    const textArea = props.textAreaRef.current;

    var selection = window.getSelection();
    if (selection && selection.rangeCount === 0) return;

    selection = selection.getRangeAt(0);

    var selectedText = selection.extractContents();

    var tagElement = document.createElement(tagAlias);
    tagElement.appendChild(selectedText);
    selection.insertNode(tagElement);

    props.formContext.setFieldValue(props.name, textArea.innerHTML);
  }

  const clearText = (e) => {

    const textArea = props.textAreaRef.current;

    var selection = window.getSelection();
    if (selection && selection.rangeCount === 0) return;

    // According to mouse movemenet

    let range = selection.getRangeAt(0);
    let clearText = range.toString();

    // Если котекст это текст
    if (selection.anchorNode.nodeType === 3) {

      let wholeText = range.endContainer.parentNode.textContent;

      let tag = range.endContainer.parentNode.nodeName;

      if (tag == "B" || tag == "I" || tag == "U" || tag == "P") {

        if (clearText.length != wholeText.length) {

          range.deleteContents();
          range.insertNode(document.createTextNode("|"));
          const textT = range.endContainer.textContent;

          const textParts = textT.split("|");

          if (range.commonAncestorContainer.nodeName == tag) {
            range.endContainer.remove();

            if (textParts[1].length > 0) {
              let tagElement = document.createElement(tag);
              tagElement.appendChild(document.createTextNode(textParts[1]));
              range.insertNode(tagElement);
            }
            range.insertNode(document.createTextNode(clearText));
            if (textParts[0].length > 0) {
              let tagElement = document.createElement(tag);
              tagElement.appendChild(document.createTextNode(textParts[0]));
              range.insertNode(tagElement);
            }
          } else {
            range.deleteContents();
            range.insertNode(document.createTextNode(clearText));
          }

        } else {
          range.endContainer.parentNode.remove();
          range.insertNode(document.createTextNode(wholeText));
        }

      } else {
        range.deleteContents();
        range.insertNode(document.createTextNode(clearText));
      }

    } else {
      range.deleteContents();
      range.insertNode(document.createTextNode(clearText));
    }

    props.formContext.setFieldValue(props.name, textArea.innerHTML);
  }

  const insertImage = (url, width = null, height = null, alt = null) => {

   // dispatch(removeModalItem(0));

    const textArea = props.textAreaRef.current;

    var selection = window.getSelection();
    if (selection && selection.rangeCount === 0) return;

    selection = selection.getRangeAt(0);

    var selectedText = selection.extractContents();

    var imgNode = document.createElement('img');
    imgNode.src = url;
    if (width) imgNode.width = width;
    if (height) imgNode.height = height;
    if (alt) imgNode.alt = alt;console.log(selection);
    selection.insertNode(imgNode);

    props.formContext.setFieldValue(props.name, textArea.innerHTML);
  }

  const openInsertImagePanel = () => {
    // dispatch(pushItemToModal(
    //   <InsertImageForm
    //     url="http://spets-zabor.ru/upload/contents/1/konstrukciya_zabora.jpg"
    //     width="200"
    //     height="100"
    //     insertImage={insertImage}
    //   />,
    //   'Вставить изображение'
    // ));
  }

  return (
    <div className="text-editor-panel">
      <Bold wrapInTag={wrapInTag}/>
      <Italic wrapInTag={wrapInTag}/>
      <Underline wrapInTag={wrapInTag}/>
      <Clear clearText={clearText}/>
      <Image openInsertImagePanel={openInsertImagePanel}/>
    </div>
  );
};

export default TextEditorPanel;
