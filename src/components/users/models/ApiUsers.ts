import Model from "@/app/models/model";

class ApiUsers extends Model {

  static get apiEntityName(): string {
    return "ApiUsers";
  }

}

export default ApiUsers;
