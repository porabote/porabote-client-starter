import React, {useContext, useEffect, useState} from 'react';
import ApiService from "@/services/api-service";
import GreedColumn from "@app/ui/greed/greed-column";
import Greed from "@app/ui/greed";
import moment from "moment/moment";
import {SettingsContext} from "@app/settings/settings";

const GuestCheckinsModal = (props) => {

  const [checkins, setCheckins] = useState([]);

  const {lang} = useContext(SettingsContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let req = await ApiService.get(`/checkins/get/`, {}, {
      query: {
        relations: ['guest.level', 'club'],
        where: {
          user_id: props.record.user_id,
        }
      }
    });
    setCheckins(req.data);
  }

  return (
    <div>
      <Greed records={checkins} class="feed striped">
        <GreedColumn label={{en: 'ID', ru: 'ID'}} name="id" dataKey="id" width="100px"/>
        <GreedColumn
          name="level"
          width="120px"
          render={(record) => record.guest.level && record.guest.level.title}
          label={{ru: "Уровень трат", en: "Spanding level"}}/>
        <GreedColumn
          name="phone"
          width="120px"
          dataKey="guest.phone"
          label={{ru: "Телефон", en: "Phone"}}/>
        <GreedColumn
          name="friends_count"
          dataKey="friends_count"
          width="120px"
          label={{ru: "Друзей", en: "Friends"}}/>
        <GreedColumn
          name="created_at"
          render={(record) => <div><b>{moment(record.created_at).format("DD-MM-YYYY HH:mm")}</b></div>}
          width="180px"
          label={{ru: "Время чекина", en: "Checkin's time"}}/>
        <GreedColumn
          name="club"
          render={(record) => record.club && record.club[`name_${lang}`]}
          width="1fr"
          label={{ru: "Клуб", en: "Club"}}/>
      </Greed>
    </div>
  );
};

export default GuestCheckinsModal;