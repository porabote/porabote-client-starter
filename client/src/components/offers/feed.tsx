import React from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedContainer from "./feed/feed-container";

const Feed = () => {
  return(
    <DataSourceWrapper modelName="offers">
      <FeedContainer/>
    </DataSourceWrapper>
  );
};

export default Feed;