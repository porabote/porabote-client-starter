import Api from "@/services";
import IModel from "./i-model";
import Entity, {IEntity} from "./entity";

class Model implements IModel {

  page: number = 1;
  _apiEntityName: string;
  method: string = "get";
  queryParams: {} = {};
  httpMethod = "GET";

  constraints = {
    where: {},
    whereIn: {},
    orWhereGrouped: {},
    whereBetween: {},
    whereNotNull: [],
  };

  constructor() {
    this._apiEntityName = this.constructor.apiEntityName;
  }

  setMethod = (methodName: string) => {
    this.method = methodName;
    return this;
  }

  seHttpMethod = (methodName: string) => {
    this.httpMethod = methodName;
    return this;
  }

  clearConstraints = () => {
    this.constraints = {
      where: {},
      whereIn: {},
      whereBetween: {},
      orWhereGrouped: {},
    };
  }

  setQueryParams = (params: { [key: string]: any }) => {
    this.queryParams = Object.assign(this.queryParams, params);
    return this;
  }

  setWhere = (params: { [key: string]: any }) => {
    this.constraints.where = Object.assign(this.constraints.where, params);
    return this;
  }

  setWhereIn = (params: { [key: string]: any }) => {
    this.constraints.whereIn = Object.assign(this.constraints.whereIn, params);
    return this;
  }

  setWhereBetween  = (params: { [key: string]: any }) => {
    this.constraints.whereBetween = Object.assign(this.constraints.whereBetween, params);
    return this;
  }

  setOrWhereGrouped = (params: { [key: string]: any }) => {
    this.constraints.orWhereGrouped = Object.assign(this.constraints.orWhereGrouped, params);
    return this;
  }

  whereNotNull  = (params: []) => {
    this.constraints.whereNotNull = [...this.constraints.whereNotNull, ...params];
    return this;
  }

  setPage = (page: number) => {
    this.page = page;
    return this;
  }

  with = [];
  setWith = (withList = []): any => {
    this.with = [...this.with, ...withList];
    return this;
  }

  _limit = 500;
  setLimit(limit: number) {
    this._limit = limit;
    return this;
  }

  set limit(limit: number) {
    this._limit = limit;
    return this;
  }

  post = async (apiMethod: string, params: {body: any} = {}) => {
    //this.get();
    let uri = `/api/${this._apiEntityName}/method/${apiMethod}`;

    let response = await Api.post(uri, {
        body: params.body || {},
      }
    );
    return response;
  }

  async get(id?: number | string) {

    // if (this.httpMethod == "POST") {
    //   return this.post("get", {
    //     body: {
    //       ...this.queryParams,
    //       ...this.constraints,
    //       include: {...this.with},
    //       limit: this._limit,
    //       page: this.page,
    //     }
    //   });
    // }

    let primaryKeyValue = (id) ? id : '';

    let uri = `/api/${this._apiEntityName}/get/${primaryKeyValue}`;
    if (this.method != "get") `/api/${this._apiEntityName}/method/${this.method}/${primaryKeyValue}`;

    const requestData = {
      ...this.queryParams,
      ...this.constraints,
      include: {...this.with},
      limit: this._limit,
      page: this.page,
    };

    let response = [];
    if (this.httpMethod == "GET") {
      response = await Api.get(uri, {
        query: requestData,
      });
    } else if (this.httpMethod == "POST") {
      response = await Api.post(uri, {
        body: requestData,
      });
    }

    if (id) {
      return this.entity = {
        ...response.data,
        type: this._apiEntityName,
        // primaryKey: this.entity.primaryKey,
        update: this.update,
      }
    } else {
      return {
        data: response.data,
        meta: response.meta,
      };
    }

    this.with = {};
    this.clearConstraints();

    return this.entity;
  }

  async create(entity: IEntity): Promise<any> {
    return Api.post(`/api/${this.constructor.apiEntityName}/create/`, {
      body: entity.getAttributes(),
    });
  }

  async update(entity: IEntity) {
    return await Api.post(`/api/${this.constructor.apiEntityName}/update/${entity.getAttribute(entity.getPrimaryKey())}`, {
      body: entity.getAttributes(),
    });
  }

  static async save(records: IEntity[]) {
    return await Api.post(`/api/${this.apiEntityName}/save/`, {
      body: {records},
    });
  }

  async delete(primaryKeyValue) {
    return await Api.get(`/api/${this._apiEntityName}/delete/${primaryKeyValue}`); // TODO
  }

  static createEntity(attributes: {}) {
    return new Entity(this, attributes);
  }

}

export default Model;
