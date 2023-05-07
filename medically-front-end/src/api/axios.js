import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3002";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
};

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export default axiosClient;
