import {API_URL, API_VERSION} from "./constants";

type GetProps = {
  query?: { [key: string]: string | number }
  url?: string
}

interface IApi {
  get: (url?: string) => {}
}

const Api = (): void => {

  const get = async (uri: string, params: GetProps) => {
    let queryUri = uri;

    const url = typeof params.url !== "undefined" ? params.url : API_URL;

    if (typeof params.query !== "undefined") {
      const query = objectToQuerystring(params.query, null);
      queryUri = `${queryUri}?${query}`;
    }

    const init: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Access-Control-Allow-Credentials": "omit",
        Authorization: `bearer ${getToken()}`,
        Accept:
          "application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
          "Content-Type": "application/json, text/html;charset=UTF-8",
          "Api-Version": "2",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }

    let response: Response = await fetch(`${url}${queryUri}`, init);

    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return {...data, ...{response: {status: response.status}}};
  };

  const post = async (uri, params) => {
    const url = typeof params.url !== "undefined" ? params.url : API_URL;

    const headersDefault = {
      "Access-Control-Allow-Credentials": "omit",
      Authorization: `bearer ${getToken()}`,
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Api-Version": API_VERSION,
    };

    let body = {...params.body};

    // Excluding Content type for correctly binding of data
    if (params.body instanceof FormData) {
      delete headersDefault["Content-Type"];
      body = params.body;
    } else {
      body = JSON.stringify(body);
    }

    const headers = Object.assign(headersDefault, params.headers);

    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    });

    const responseJSON = await response.json();
    return {...responseJSON, ...{response: {status: response.status}}};
  };

  /**
   * Parsing Object to URI
   */
  const objectToQuerystring = (obj: { [key: string]: string | number }, prefix): string => {
    const str = [];
    Object.keys(obj).map((key) => {
      const k = prefix ? `${prefix}[${key}]` : key;
      const v = obj[key] ? obj[key] : "";
      str.push(
        v !== null && typeof v === "object"
          ? objectToQuerystring(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      );
      return k;
    });

    return str.join("&");
  };

  /**
   * Parsing URI to Object
   */
  const queryStringToObject = (uri) => {
    let uriArray = uri.replace(/^\?*/, "");
    if (uriArray.length === 0) return {};

    uriArray = uriArray.split("&");

    const uriObj = {};
    for (let i = 0; i < uriArray.length; i += 1) {
      const chainArray = uriArray[i].split("=");
      uriObj[chainArray[0]] = {...chainArray[1]};
    }

    return uriObj;
  };

  const getToken = () => {
    let accessToken = localStorage.getItem("access_token");
    if (typeof accessToken === "object") {
      accessToken = "";
    }
    return accessToken;
  };
}

export default Api;
