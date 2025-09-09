import axios from "axios";
import {API_URL} from "../util/variables.js";
import Cookies from "js-cookie";

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

axiosApi.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
  return config;
});

axiosApi.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default axiosApi;
