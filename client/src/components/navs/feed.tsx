import React from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedContainer from "./feed/feed-container";

const Feed = () => {
  return(
    <DataSourceWrapper modelName="navs">
      <FeedContainer/>
    </DataSourceWrapper>
  );
};

export default Feed;