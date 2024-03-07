import Model from "../../../app/__models/model";

class ApiUsers extends Model {

  static get apiEntityName(): string {
    return "ApiUsers";
  }

}

export default ApiUsers;
