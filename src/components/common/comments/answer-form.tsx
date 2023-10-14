import React, {useState} from "react"
import {Form, Field, TextArea, InputBare, Button} from "../../../plugins/form";
import CommentsModel from "./models/Comments";

const AnswerForm = (props) => {

  const [answerTo, setAnswerTo] = useState(props.parentMsg.user.name);
  const [isSubmitReady, setIsSubmitReady] = useState(true);

  const initValues = {
    ...props.where,
    parent_id: props.parentMsg.id,
    msg: "",
    name: props.auth.user.name,
  };

  const submit = async (entity) => {
    const model = new props.model(entity.attributes);

    setIsSubmitReady(true);

    let newEntity = CommentsModel.createEntity(entity.attributes);
    let res = await newEntity.save();

    props.fetchData();
  }

  return (
    <Form
      model={CommentsModel}
      initValues={initValues}
      onSubmit={submit}
    >
      <div
        className={!props.isAnswerFormActive ? "comments__sub-form hide" : "comments__sub-form"}
      >
        <div className="comments__form__input-couple__wrap">
          <label className="comments__form__input-couple__item__label first">
            <span className="comments__form__listener-fio">{answerTo}</span>
          </label>
          <label>
            <Field>
              <TextArea
                clear={true}
                name="msg"
                placeholder="Напишите ваш комментарий"
                className="comments__form__input-couple__item"
              />
            </Field>
          </label>

        </div>


        <div className="comments__form__button-panel">

          <div className="comments__form__button-panel__buttons">
            <Field>
              <Button
                type="submit"
                label="Отправить"
                disabled={isSubmitReady ? false : true}
                className="comments__form__button-panel__button send"
              />
            </Field>

              <Button
                label="Отменить"
                type="button"
                disabled={isSubmitReady ? false : true}
                className="comments__form__button-panel__button cancel"
              />


          </div>

        </div>
      </div>
    </Form>
  );

}

export default AnswerForm;


