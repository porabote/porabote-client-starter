import {ApiGetType} from "@/services/types";
import {API_URL, APP_DOMAIN_BASE, AUTH_URL} from "@/configs";
import Api from "@/services";
import JwtHandler from "@app/auth/jwt-handler";

const AuthService = () => {

  const signIn = async (values, callbackSuccess, callbackError) => {

    const {username, password, account_id} = values;

    try {
      const data = {username, password, account_id};
      const res = await Api.post('/signIn', data, {
        url: AUTH_URL,
      });
      if (res.error) {
        return res;
      }

      const {accessToken, refreshToken} = res.data;
      setAccessToken(accessToken);
      //return await setRefreshToken(refreshToken);
      return res;

    } catch (e) {
      console.log(e);
    }
  }

  const signUp = async (values) => {
    return await Api.post("/signUp", values, {url: AUTH_URL});
  }

  const setRefreshToken = async (refreshToken: string) => {

    const port = process.env.NODE_ENV == 'development' ? 8001 : 8001;//todo
    return await post('/auth/refreshToken/', {refreshToken}, {
      url: `https://${APP_DOMAIN_BASE}:${port}`,
    });

  }

  const setAccessToken = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
  }

  const refreshToken = () => {


    //console.log(resRT);
    //localStorage.setItem('access_token', accessToken);

    return post("/auth/refresh");
  }

  const logout = () => {
    return post("/auth/logout")
  }

  const post = async (
    uri: string,
    data?: { [key: string]: any } | FormData,
    params: ApiGetType = {url: API_URL, headers: {}}) => {

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
    return {...responseJSON, ...{response: {status: response.status}}};
  }

  const getToken = () => {
    let accessToken = localStorage.getItem("access_token");
    if (typeof accessToken === "string" && accessToken.length > 0) {
      return accessToken;
    }
    return null;
  };

  const getTokenData = () => {
    const token = getToken();
    if (token !== null) {
      return JwtHandler.parsePayload(getToken());
    }
    return null;
  }

  const signOut = () => {

  }

  return {
    signIn,
    signUp,
    signOut,
    getToken,
    getTokenData,
  };

}

export default AuthService();