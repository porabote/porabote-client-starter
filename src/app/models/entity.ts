import {ArrayMapper} from "../collections";
import IModel from "./i-model";

export interface IEntity {
  primaryKey: string | number | null;
  getPrimaryKey: () => string | null;
  getPrimaryKeyValue: () => string | null;
  attributes: { [key: string]: any };
  getAttribute(name: string): any;
  getAttributes(): { [key: string]: any };
  setAttribute(name: string, value: any, mode?: string): any
  save(): any;
};

class Entity implements IEntity {

  isNew: boolean;
  primaryKey = 'id';
  attributes: { [key: string]: any } = {};
  #model: IModel;

  constructor(model: IModel, attributes:{[key: string]: any} = {}) {
    this.#model = new model();
    this.isNew = (typeof attributes[this.primaryKey] != "undefined" && attributes[this.primaryKey]) ? false : true;
    this.setAttributes(attributes, true);
  }

  async setAttributes(attributes: {}, isInit = false) {
    this.attributes = attributes;
  }

  loadRecord = async () => {
    let record = null;
    let primaryKeyValue = ArrayMapper.getValueByPath(this.getPrimaryKey(), this.attributes);

    if(primaryKeyValue) {
      record = await this.#model.get(primaryKeyValue);
      if (typeof record.attributes != "undefined") {
        this.attributes = Object.assign(this.attributes, record.attributes);
      }
    }
    return this.attributes;
  }

  getAttribute(name: string): any {
    return ArrayMapper.getValueByPath(name, this.attributes);
  }

  getAttributes() {
    return this.attributes;
  }

  setAttribute(name: string, value: any, mode?: string) {

    if (!mode) mode = 'merge';

    const valueBranch = ArrayMapper.buildPathBranch(name, value)

    switch (mode) {
      case 'merge': //if value is string or object
        var values = ArrayMapper.mergeValues(this.attributes, valueBranch);
        break;
      case 'delete': // unset value ( with key )
        var values = ArrayMapper.deleteValue(this.attributes, name);
        break;
      case 'replace': // if value is array - target array will be replaced to source array
        var values = ArrayMapper.replaceValue(this.attributes, valueBranch);
        break;
      case 'push': // if value is array - source array will be added to target array
        var values = ArrayMapper.pushValue(this.attributes, name, value);
        break;
      case 'spliceByKey': // if value is array - source array will be removed from target array
        var values = ArrayMapper.spliceByKey(this.attributes, name, value)
        break;
      case 'patch': // Set new path in source
        var values = ArrayMapper.setPatch(this.attributes, name, value)
        break;
    }

    Object.assign(this.attributes, values);

  }

  getPrimaryKey() {
    return this.primaryKey;
  }

  getPrimaryKeyValue() {
    return this.getAttribute(this.primaryKey);
  }

  async save(): Promise<any> {

    let result = null;

    let primaryKeyValue = this.getPrimaryKeyValue();

    if (primaryKeyValue) {
      result = await this.#model.update(this);
    } else {
      result = await this.#model.create(this);
    }

    return result;
  }

}

export default Entity;
