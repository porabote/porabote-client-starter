import React from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import FeedContainer from "./feed/feed-container";

const Feed = () => {
  return(
    <DataSourceWrapper>
      <FeedContainer/>
    </DataSourceWrapper>
  );
};

export default Feed;