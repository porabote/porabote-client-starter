import React, {useEffect, useState} from 'react';
import Page from "@/components/users/admin/profile/templates/page";
import {useParams} from "react-router";
import Api from "@/services/api-service";

const Container = () => {

  let { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const record = await Api.get(`/users/get/${id}`, {}, {
      query: {
        relations: ['accounts', 'aro.permissions']
      },
    });
    setRecord(record.data);
  }

  return (
    <div>
      <Page record={record}/>
    </div>
  );
};

export default Container;