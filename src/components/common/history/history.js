import React, { useEffect, useState } from "react";
import HistoryItem from "porabote/history/history-item";
import moment from "moment";
import HistoryModel from "./models/History";

const History = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await new HistoryModel()
      .setWhere(props.where)
      .get();
    setData(data.data);
  };

  const count = Object.keys(data).length;

  return (
    <div className="comments">
      <div className="comments__title sidebar-box-up"><span>История ({count})</span></div>
      {
        data.map((item, index) => {
          return (
            <HistoryItem
              key={index}
              msg={item.attributes.msg}
              user={item.attributes.user_name}
              datetime={moment(item.attributes.created_at || item.attributes.date_created)
                .format("DD MMM YYYY HH:mm")}
            />
          );
        })
      }
    </div>
  );

};

export default History;
