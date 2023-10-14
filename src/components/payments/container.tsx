import React, {useEffect, useState} from "react";
import {registrationReducer, registrationSaga} from "@/store";
import {useAppSelector} from "@/app/hooks/hooks";
import {IMatch} from "../../app/types/ts-react-types";
import paymentsReducer from "./redux-store/reducer";
import sagaWatcher from "./redux-store/saga";
import {fetchFeedData, updateFeedFilters} from "./redux-store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";

interface IChildComponentProps extends React.Props<any> {
   match: IMatch<{
     id: string,
     action: string,
   }>;
   fetchFeedData: () => {type: string},
   filters: Object,
}

const Container = (props: IChildComponentProps): JSX.Element => {

  registrationReducer("payments", paymentsReducer);
  registrationSaga("payments", sagaWatcher);

  useEffect(() => {
    fetchData();
  }, []);

  const paymentsState = useAppSelector(state => state.payments);

  const fetchData: () => void = () => {
    fetchFeedData();
  }

  const updateFilters: Function = (values: any[]) => {
    updateFeedFilters(values);
  }

  if (props.match.params.action === "view") {
    return <ViewContainer id={props.match.params.id} fetchFeedData={fetchData}/>;
  }

  return React.createElement(Feed, {
    fetchData,
    updateFilters,
  });

}

export default Container;
