const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/auth/google",
};

// admin endpoints
export const adminEndpoints = {
  GET_ALL_USERS: BASE_URL + "/admin/users",
  REMOVE_USER: BASE_URL + "/admin/remove-user",
  ADD_API_KEY: BASE_URL + "/admin/add-api-key",
  REMOVE_API_KEY: BASE_URL + "/admin/remove-api-key",
  SET_ACTIVE_API_KEY: BASE_URL + "/admin/set-active-api-key",
  GET_ALL_API_KEY: BASE_URL + "/admin/api-keys",
};
