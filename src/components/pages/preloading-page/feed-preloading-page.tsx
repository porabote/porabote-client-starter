import React from "react";
import FilterTopPreloader from "./filter-top-preloader";
import FilterLeftPreloader from "./filter-left-preloader";
import {Table, Cell, Row} from "@components/common/ui/table";

type preloadingPageProps = {
  title: string;
};

const FeedPreloadingPage = (props: preloadingPageProps) => {

  return (
      <div className="content feed">

        <div className="content__top-filter">
          <FilterTopPreloader/>
        </div>

        <div className="content-title">
          {/*<MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>*/}
          {props.title}
        </div>

        <div className="content__filter__left">
          <FilterLeftPreloader/>
        </div>

        <div className="content__body">

          <Table grid-template-columns="60px repeat(5, 200px)">
            <Cell className="head">
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
            </Cell>

          </Table>

          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>

        </div>
      </div>

  )
}

export default FeedPreloadingPage;
