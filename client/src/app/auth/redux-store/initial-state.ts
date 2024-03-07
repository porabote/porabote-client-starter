const initialState = {
  isAuth: false,
  access_token: null,
  user: {
    account_alias: "",
    api_id: null,
    avatar: "",
    exp: 0,
    iat: 0,
    id: null,
    name: "",
    post_name: "",
    role_id: null,
    username: "",
  },
  dictsRequired: ["accounts"],
};

export default initialState;