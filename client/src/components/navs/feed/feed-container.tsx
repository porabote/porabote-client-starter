import React, {createElement, useContext, useEffect} from 'react';
import FeedView from "./templates/feed-view";
import Api from "@/services/api-service";
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";

const FeedContainer = () => {

  const {setRecords, searchValue} = useContext(DataSourceContext);

  // useEffect(() => {
  //   fetchData();
  //   //migration();
  // }, []);

  // const fetchData = async () => {
  //   const records = await Api.get("/menus/get", {}, {
  //     query: {
  //       orderBy: {id: "desc"},
  //       limit: 100,
  //     }
  //   });
  //   setRecords(records.data);
  // }

  return(
      <FeedView/>
  );
};

export default FeedContainer;