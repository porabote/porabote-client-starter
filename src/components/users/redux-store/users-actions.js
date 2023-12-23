import {
  FETCH_FEED_USERS_DATA,
  FETCH_FEED_USERS_DATA_SUCCEEDED,
  FETCH_FEED_USERS_DATA_ERROR,
} from "./users-types";

const fetchFeedData = () => ({ type: FETCH_FEED_USERS_DATA });

const fetchFeedDataSuccess = (data) => ({
  type: FETCH_FEED_USERS_DATA_SUCCEEDED,
  payload: data,
});

const fetchFeedDataError = (error) => ({
  type: "FETCH_FEED_USERS_DATA_ERROR",
  payload: error,
});

const updateFeedFilters = (data) => ({
  type: "UPDATE_FILTERS_USERS",
  payload: data,
});

export {
  fetchFeedData,
  fetchFeedDataSuccess,
  fetchFeedDataError,
  updateFeedFilters,
};
