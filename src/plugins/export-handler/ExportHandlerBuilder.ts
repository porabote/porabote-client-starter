import Api from "@services";
import {API_URL} from "@configs";
import notifacations from "../notifications";
import React from "react";

class ExportHandlerBuilder {

  apiDomain: string = API_URL;
  apiUri: string | null = null;
  fileName: string = "file"
  data: any = {};

  setUri = (uri: string) => {
    this.apiUri = uri;
    return this;
  }

  setData = (data: {}) => {
    this.data = Object.assign(this.data, data);
    return this;
  }

  senFileName = (fileName) => {
    this.fileName = fileName;
    return this;
  }

  download = async () => {

    let response = await Api.post(this.apiUri, {
      body: this.data,
    });

    if (typeof response.error != "undefined") {
      notifacations.push(response.error);
      return;
    }

    if (typeof response.data.uri != "undefined") {
      const fileUrl = API_URL + response.data.uri;
      window.open(fileUrl, '_blank');
    } else {
      alert("Ошибка ответа сервера");
    }
  }

}

export default ExportHandlerBuilder;
