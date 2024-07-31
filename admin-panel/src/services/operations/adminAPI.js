import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { adminEndpoints } from "../apis";

const {
  GET_ALL_USERS,
  REMOVE_USER,
  ADD_API_KEY,
  REMOVE_API_KEY,
  SET_ACTIVE_API_KEY,
  GET_ALL_API_KEY,
} = adminEndpoints;

export async function getAllUser(token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_ALL_USERS, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
  toast.dismiss(toastId);
}

export async function removeUser(chatId, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      REMOVE_USER,
      { chatId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("User removed successfully");
    console.log("REMOVE_USER_API RESPONSE.......", response);
  } catch (error) {
    console.log("REMOVE_USER_API ERROR.......", error);
    toast.error("Something went wrong. Please try again later");
  }
  toast.dismiss(toastId);
}

export async function addApiKey(apiKey, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      ADD_API_KEY,
      { apiKey },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("Api key added successfully");

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong. Please try again later");
  }
  toast.dismiss(toastId);
}

export async function setActiveKey(apiKeyId, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      SET_ACTIVE_API_KEY,
      { apiKeyId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("SET_ACTIVE_API RESPONSE.......", response);
    toast.success("Api key is activated");
  } catch (error) {
    console.log("SET_ACTIVE_API ERROR.......", error);
    toast.error("Something went wrong. Please try again later");
  }
  toast.dismiss(toastId);
}

export async function removeApiKey(apiKeyId, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      REMOVE_API_KEY,
      { apiKeyId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("Api removed successfully");
    console.log("REMOVE_API_KEY_API RESPONSE.......", response);
  } catch (error) {
    console.log("REMOVE_API_KEY_API ERROR.......", error);
    toast.error("Something went wrong. Please try again later");
  }
  toast.dismiss(toastId);
}

export async function getAllApiKey(token) {
  try {
    const response = await apiConnector("GET", GET_ALL_API_KEY, null, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
