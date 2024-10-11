import axios from "axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    // "content-type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    // config.headers.authorization = `Bearer ${accessToken}` ?? ""
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.notify) {
      toast.success(data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.notify) {
        toast.error(data.message);
      }
    }
    return error;
  }
);

export default instance;
