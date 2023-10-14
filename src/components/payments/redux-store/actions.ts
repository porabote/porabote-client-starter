import {ErrorType} from "@/store/types";
import store from '@/store';
import {
  FETCH_FEED_DATA,
  FETCH_FEED_DATA_SUCCEEDED,
  FETCH_FEED_DATA_ERROR,
  UPDATE_FILTERS,
} from './types';
import {actionType} from "@/store/types";

const fetchFeedData: actionType<any[]> = () => {
  store.dispatch({
    type: FETCH_FEED_DATA,
  });
};

const fetchFeedDataSuccess: actionType<any[]> = (data: any[]) => {
  return {
    type: FETCH_FEED_DATA_SUCCEEDED,
    payload: data,
  };
};

const fetchFeedDataError = (error: ErrorType) => {
  store.dispatch({
    type: FETCH_FEED_DATA_ERROR,
    payload: error,
  });
};

const updateFeedFilters = (data: any[]) => {
  store.dispatch({
    type: UPDATE_FILTERS,
    payload: data
  });
}

export { fetchFeedData, fetchFeedDataSuccess, fetchFeedDataError, updateFeedFilters }
