import React from "react";
import CommentListItem from "./comment-list-item";

const CommentList = (props) => {

  const parentGroups = {};

  const setNestedList = () => {

    let data = props.data.filter((item, index) => {

      if (item.attributes.parent_id !== null) {

        if (typeof parentGroups[item.attributes.parent_id] == "undefined") {
          parentGroups[item.attributes.parent_id] = [];
        }

        parentGroups[item.attributes.parent_id][item.id] = item;

      } else {
        return true;
      }
    });

    data.map((item, index) => {
      item["children"] = [];
      setChildren(item);
    });

    return data;
  };

  const setChildren = (item) => {
    if (typeof parentGroups[item.id] !== "undefined") {
      item.children = parentGroups[item.id];
      parentGroups[item.id].map(child => {
        setChildren(child);
      });
    }
  };



    if (props.loading) return <div className="empty-data">Комментарии загружаются...</div>;

    if (props.data.length == 0) {
      return <div className="empty-data">Комментарии не
        добавлялись</div>;
    }

    let data = setNestedList();

    return (
      <div className="comments__items">
        {data.map((item, index) => {
          return <CommentListItem
            where={props.where}
            addUrl={props.addUrl}
            auth={props.auth}
            key={index}
            answers={item.children}
            data={{ user: item.relationships.user.attributes, ...item.attributes }}
            fetchComments={props.fetchComments}
            parentGroups={parentGroups}
            model={props.model}
            fetchData={props.fetchData}
          />;
        })}
      </div>
    );
}

export default CommentList;
