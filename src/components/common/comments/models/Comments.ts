import Model from "../../../../app/models/model";

class Comments extends Model {

  static get apiEntityName(): string {
    return "Comments";
  }

}

export default Comments;
