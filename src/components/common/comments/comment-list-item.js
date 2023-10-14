import React, { useState } from "react";
import avatar from "./svg/user_no-photo.svg";
import AnswerForm from "./answer-form";
import CommentListItemAnswer from "./comment-list-item-answer";
import moment from "moment";

const CommentListItem = (props) => {

  const [isAnswerFormActive, setIsAnswerFormActive] = useState(false);

  const showAnswerForm = () => {
    setIsAnswerFormActive(true);
  };

  return (
    <div className="comments__item">
      <div className="comments__item-avatar">
        <div className="comments__item-avatar-img"
             style={{ backgroundImage: `url(${avatar})` }}
        >
        </div>
      </div>
      <div className="comments__item-fio">
        <span className="comments__item-fio__sender">{`${props.data.user.name}`}</span>
        <span className="comments__listener-fio hide"></span>
      </div>
      <div className="comments__item-date">
        <time>
          {moment(props.data.date_created)
            .format("DD MMM YYYY в hh:mm")}
        </time>
      </div>
      <div className="comments__item-title"
           dangerouslySetInnerHTML={{ __html: props.data.msg }}>
      </div>

      <div className="comments__item-response">

        <div
          className="comments__item-response-link"
          onClick={() => {
            showAnswerForm();
          }}
        >
          Ответить
        </div>

        <div className="comments__item-response-form">
          <AnswerForm
            where={props.where}
            addUrl={props.addUrl}
            auth={props.auth}
            fetchComments={props.fetchComments}
            parentMsg={props.data}
            isAnswerFormActive={isAnswerFormActive}
            model={props.model}
            fetchData={props.fetchData}
          />
        </div>

        <div className="comments__item__sub-items container sub comments__item__childs-container">
          {
            props.answers.map((item, index) => {
              return (
                <CommentListItemAnswer
                  where={props.where}
                  addUrl={props.addUrl}
                  auth={props.auth}
                  key={index}
                  data={{ user: item.relationships.user.attributes, ...item.attributes }}
                  parentMsg={props.data}
                  fetchComments={props.fetchComments}
                  parentGroups={props.parentGroups}
                  model={props.model}
                  fetchData={props.fetchData}
                />
              );
            })
          }
        </div>

      </div>
    </div>
  );

};

export default CommentListItem;
