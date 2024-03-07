import React, {useState, useRef} from 'react';
import {Form, Field, InputBare, Button} from '/src/plugins/form';
import TextEditor from "../../../del_plugins/text-editor";
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import CommentsModel from "./models/Comments";

const CommentForm = (props) => {

  const [isSubmitReady, setIsSubmitReady] = useState(true);
  const [textAreaHeight, setTextAreaHeight] = useState(110);

  const initValues = {
    ...props.where,
    msg: '',
    name: props.auth.user.name
  };


  const sendComment = async (entity) => {

    const model = new props.model(entity.attributes);

    setIsSubmitReady(true);

    let newEntity = CommentsModel.createEntity(entity.attributes);
    let res = await newEntity.save();

    props.fetchData();
  }


  const textariaId = Math.random();

  return (
    <Form
      model={CommentsModel}
      initValues={initValues}
      onSubmit={sendComment}
    >
      <div className="comments__form">

        <div className="comments__form__input-couple__wrap">
          <span className="comments__form__input-couple__item__label first">
            <Field>
              <InputBare
                name="name"
                readOnly=""
                value=""
                onChange={() => {
                }}
                placeholder="Ваше имя"
                className="comments__form__input-couple__item first"
              />
            </Field>
          </span>

          <div
            style={{minHeight: `${textAreaHeight}px`}}
          >

            <Field>
              <TextEditor
                name="msg"
                onInput={(ev, props) => {
                  props.formContext.entity.setAttribute(props.name, ev.target.innerHTML);
                }}
              />
            </Field>

          </div>

        </div>

        <div className="comments__form__button-panel">

          <Field>
            <Button
              type="submit"
              disabled={isSubmitReady ? false : true}
              className="comments__form__button-panel__button send"
              label="Отправить"
            />
          </Field>
          <AlternateEmailOutlinedIcon
            className="link_with_icon grey"
            style={{
              marginRight: '6px',
            }}
            onClick={(e) => {
              //modal.open(<>);
            }}
          />
        </div>
      </div>
    </Form>
  )
    ;

}

export default CommentForm;
// const mapStateToProps = (state) => {
//     return ({
//         auth: auth,
//     })
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         openObserversList: (recordId, businessEventIds, auth) => dispatch({
//             type: 'PUSH_MODAL_ITEM',
//             payload: {
//                 title: `Список оповещений`,
//                 content: React.createElement(ObserversByRecord, {
//                     recordId,
//                     businessEventIds,
//                     auth
//                 })
//             }
//         }),
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
