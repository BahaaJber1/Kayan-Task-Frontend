import axios from "axios";
import { BASE_URL } from "@config/settings.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    const message = error.response ? error.response.data.message : null;
    const reason = error.response ? error.response.data.reason : null;

    error.status = status;
    if (status === 401) {
      error.message =
        message || "You need to logged in to perform this operation";
      error.reason = reason || "Unauthenticated";
    } else if (status === 403) {
      error.message =
        message || "You don't have authorization to perform this action";
      error.reason = reason || "Unauthorized";
    } else if (status === 404) {
      error.message =
        message || "No data was returned with the specified parameters";
      error.reason = reason || "Not Found";
    } else {
      error.message = "Connection between servers general fail";
      error.reason = "Server Error";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
