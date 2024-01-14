import Api from "../../services";

const AuthActions = () => {

  function login(data: {}) {

    // dispatch(loginRequest());
    //
    // Api.post(LOGIN_API_URL, {
    //   body: data
    // }).then((resp: { data: { jwtToken: any } }) => {
    //   const parsedData = setToken(resp.data.jwtToken);
    //   const {
    //     data,
    //     access_token
    //   } = parsedData;
    //
    //   dispatch(loginSuccess(data, access_token));
    // });
  }

  static function parseJwt(token: string) {
    var base64Url = token.split('.')[1];

    if (base64Url === undefined) return null;

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function setToken(tokens: { access_token: string }) {

    let data = {}
    let access_token = null

    if (typeof tokens.access_token !== "undefined") {
      access_token = tokens.access_token;
      data = parseJwt(tokens.access_token);
    }

    return {
      access_token,
      data,
    };
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('porabote_user', JSON.stringify(data));
  }

}