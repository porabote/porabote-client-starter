import React, {useEffect, useState} from 'react';
import ProfileView from "./templates/profile-view";
import Api from "../../../services/api-service";
import {useParams} from "react-router";

const ProfileContainer = (props) => {

  let { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const record = await Api.get(`/guests/get/${id}`, {}, {
      query: {
        relations: ['payments.club', 'checkins', 'points', 'gifts', 'orders']
      },
    });
    setRecord(record.data);
  }

  return <ProfileView record={record}/>;
};

export default ProfileContainer;