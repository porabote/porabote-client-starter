import {ResponseMetaType} from "./ResponseMetaType";

export type RecordType<RecordDataSet> = {
  id: number;
  attributes: RecordDataSet;
  meta: ResponseMetaType;
};