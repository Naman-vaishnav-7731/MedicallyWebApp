import axiosClient from "../../api/axios";
import axios from "axios";

export async function getRequest(URL) {
  const response = await axiosClient.get(`/${URL}`);
  return response;
}

export async function postRequest(URL, payload) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}
export async function putRequest(URL, payload) {
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}

//TODO:Implementation fetchuserProfile using getRequest Function
// fetch use Profile
export const fetchUserprofile = async (access_token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
