import {RecordType} from "@/services/types/RecordType";
import {ResponseMetaType} from "@/services/types/ResponseMetaType";

export type InitialStateType<RecordModelType> = {
  isDictsLoaded: boolean;
  title: string;
  filter: [];
  data: Array<RecordType<RecordModelType>>;
  meta: ResponseMetaType;
  relationships: string[];
};

export type ErrorType = {
  type: string;
  code: number;
  msg: string | {[key: string]: any};
};

export type actionType<P> = (data?: P) => void;
