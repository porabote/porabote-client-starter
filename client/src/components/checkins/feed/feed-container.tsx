import React, {createElement, useContext, useEffect} from 'react';
import FeedView from "./templates/feed-view";
import Api from "@/services/api-service";
import DataSourceWrapper, {DataSourceContext} from "@/app/data-source/data-source-wrapper";

const FeedContainer = () => {

  const {setRecords} = useContext(DataSourceContext);

  // useEffect(() => {
  //   fetchData();
  //   //migration();
  // }, []);
  //
  // const fetchData = async () => {
  //   const records = await Api.get("/payments/get", {}, {
  //     query: {
  //       orderBy: {id: "desc"},
  //       limit: 100,
  //     }
  //   });
  //   setRecords(records.data);
  // }


  const fetchDicts = async () => {
    const dicts = await Api.get("/guests/action/getDicts");
    return dicts.data;
  };

  return(
    <DataSourceWrapper
      relations={[
        'guest.level',
      ]}
      setDicts={fetchDicts}
      // greedMap={configs.greedMap}
      isFiltersOpen={true}
      modelName="checkins">
      <FeedView/>
    </DataSourceWrapper>
  );
};

export default FeedContainer;