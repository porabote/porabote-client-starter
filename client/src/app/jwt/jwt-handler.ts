import LocalStorageService from "@/app/local-storage/local-storage-service";

const Jwthandler = () => {

  const parsePayload = (token: string) => {

    var base64Url = token.split('.')[1];

    if (base64Url === undefined) return null;

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const getTokenData = () => {
    const token = LocalStorageService.getAccessToken();
    if (token !== null) {
      return parsePayload(LocalStorageService.getAccessToken() || "");
    }
    return null;
  }

  return {
    getTokenData,
    parsePayload,
  }

}

export default Jwthandler();