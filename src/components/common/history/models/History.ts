import Model from "../../../../app/models/model";

class History extends Model {

  static get apiEntityName(): string {
    return "HistoryLocal";
  }

}

export default History;
