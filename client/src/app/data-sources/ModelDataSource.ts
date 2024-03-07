export interface IModelDataSource {
  model: any;
  constraints?: {
    where?: {};
    whereNotNull?: [];
  } | undefined;
  dataPath?: string | undefined;
  limit: number;
};

const ModelDataSource = async ({model, constraints = {}, dataPath = "data", limit = 500}: IModelDataSource) => {

  let modelInstance = new model({});
  if (constraints.where) {
    modelInstance.setWhere(constraints.where)
  }

  if (constraints.where) {
    modelInstance.setWhere(constraints.where)
  }

  if (constraints.whereNotNull) {
    modelInstance.whereNotNull(constraints.whereNotNull)
  }

  modelInstance.setLimit(limit);
  let res = await modelInstance.get();

  let path = dataPath.split(".");
  path.map((step) => res = res[step]);

  let dataList: {}[] = [];
  if (typeof res === "object") {
    dataList = Object.entries(res).map((item: any[]): any[] => item[1]);
  } else {
    dataList = res;
  }

  return dataList;

};

export default ModelDataSource;
