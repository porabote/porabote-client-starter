import React, {createElement, useContext, useEffect} from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedContainer from "./feed/feed-container";

const Feed = () => {
  return(
    <DataSourceWrapper modelName="guests">
      <FeedContainer/>
    </DataSourceWrapper>
  );
};

export default Feed;