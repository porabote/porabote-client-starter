import React, {useState, useEffect} from "react";
import {useAppSelector} from "../../../app/hooks/hooks";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import "./comments.less";
import CommentsModel from "./models/Comments";

type CommentsProps = {
  recordId: number;
  businessEventId: number;
  modelName: string;
};

const Comments = (props: CommentsProps) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    setLoading(true);

    try {
      let data = await new CommentsModel()
        .setWith(["user"])
        .setWhere({...props.where})
        .get();
      setData(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      alert("Ошибка загрузки комментариев.");
    }
  }

  return (
    <div className="comments">

      <div className="comments__title">Комментарии (0)</div>

      <CommentForm auth={auth} {...props} fetchData={fetchData}/>
       <CommentList
         where={props.where}
         auth={auth}
         data={data}
         loading={loading}
         model={props.model}
         fetchData={fetchData}
       />
    </div>
  );

};

export default Comments;
