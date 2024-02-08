import {ApiGetType} from "@/services/types";
import {API_URL, API_VERSION} from "@/configs";

const Api = () => {

  const get = async (
    uri: string,
    data: {[key: string]: any},
    params: ApiGetType = {url: API_URL, headers: {}}
  ) => {

    let queryUri = uri;

    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

    if (typeof params.query !== "undefined") {
      const query = objectToQuerystring(params.query);
      queryUri = `${queryUri}?${query}`;
    }

    const response = await fetch(`${url}${queryUri}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Access-Control-Allow-Credentials": false,
        "Authorization": `bearer ${getToken()}`,
        "Accept": "application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
        "Content-Type": "application/json, text/html;charset=UTF-8",
        "Api-Version": `${API_VERSION}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    const responseJson = await response.json();

    // check for error response
    if (!responseJson.ok) {
      // get error message from body or default to response statusText
      const error = (responseJson && responseJson.message) || responseJson.statusText;
      return Promise.reject(error);
    }

    return { ...response, ...{ response: { status: response.status } } };
  }

  const post = async (
    uri: string,
    data?: {[key: string]: any} | FormData,
    params: ApiGetType = {url: API_URL, headers: {}}
  ) => {

    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

    const credentials = (params.credentials) ? params.credentials : 'omit';

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Access-Control-Allow-Credentials', 'false');
    requestHeaders.set('Authorization', `bearer ${getToken()}`);
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Api-Version', `${API_VERSION}`);

    if (params.headers) {
      for (const [headerName, headerValue] of Object.entries(params.headers)) {
        requestHeaders.set(headerName, headerValue);
      }
    }

    let body;
    // Excluding Content type for correctly binding of data
    if (data instanceof FormData) {
      body = data;
    } else {
      requestHeaders.set('Content-Type', 'application/json;charset=UTF-8');
      body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials,
      headers: requestHeaders,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    });

    const responseJSON = await response.json();
    return { ...responseJSON, ...{ response: { status: response.status } } };
  }


  const auth = async (
    uri: string,
    data?: {[key: string]: any} | FormData,
    params: ApiGetType = {url: API_URL, headers: {}}
  ) => {

    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Access-Control-Allow-Credentials', 'true');
    requestHeaders.set('Accept', 'application/json');

    let body;
    // Excluding Content type for correctly binding of data
    if (data instanceof FormData) {
      body = data;
    } else {
      requestHeaders.set('Content-Type', 'application/json;charset=UTF-8');
      body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: requestHeaders,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    });

    const responseJSON = await response.json();
    return { ...responseJSON, ...{ response: { status: response.status } } };
  }

  /**
   * Parsing Object to URI
   */
  const objectToQuerystring = (obj: {[key: string]: any}, prefix: string | null = null) => {
    const str: any[] = [];
    Object.keys(obj).map((key: string) => {
      const k: string = prefix ? `${prefix}[${key}]` : key;
      const v: any = obj[key] ? obj[key] : "";

      let newItem = (v !== null && typeof v === "object")
        ? objectToQuerystring(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      str.push(newItem);
      return k;
    });

    return str.join("&");
  }

  /**
   * Parsing URI to Object
   */
  const queryStringToObject = (uri: string) => {

    uri = uri.replace(/^\?*/, "");
    if (uri.length === 0) return {};

    let uriArray = uri.split("&");

    const uriObj = {};
    uriArray.forEach((item, index) => {

    });
    for (let i = 0; i < uriArray.length; i += 1) {
      const chainArray = uriArray[i].split("=");
      uriObj[chainArray[0]] = { ...chainArray[1] };
    }

    return uriObj;
  }

  const getToken = () => {
    let accessToken = localStorage.getItem("access_token");
    if (typeof accessToken === "object") {
      accessToken = "";
    }
    return accessToken;
  }

  return {get, post, auth };

}

export default Api();
