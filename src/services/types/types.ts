export type RecordType<RecordDataSet> = {
  id: number;
  attributes: RecordDataSet;
  meta: ResponseMetaType;
};

export type ResponseMetaType = {
  offset: number;
  perPage: number;
  count: number;
  fetchData: () => void;
};