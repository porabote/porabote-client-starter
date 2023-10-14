import {IEntity} from "./entity";

export default interface IModel {
  method: string;
  apiEntityName: string;
 // apiEntityName: string | null;
 // getApiEntityName: () => string | null;
  create: (entity: IEntity) => any;
  update: (entity: IEntity) => any;
  delete: (entity: IEntity) => any;
};
