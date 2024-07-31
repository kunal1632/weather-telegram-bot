import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";

const { LOGIN_API } = authEndpoints;

export function login() {
  return async (dispath) => {
    dispath(setLoading(true));
    try {
      const response = await apiConnector("GET", LOGIN_API);
      console.log("Login", response.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout(navigate) {
  return async (dispath) => {
    dispath(setLoading(true));
    try {
      dispath(setToken(null));
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    dispath(setLoading(false));
  };
}
