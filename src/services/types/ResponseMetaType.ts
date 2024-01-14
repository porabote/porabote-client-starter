export type ResponseMetaType = {
  offset: number;
  perPage: number;
  count: number;
  fetchData: () => void;
};