import axios from "axios";
import TokenService from "./token.service";

const api = axios.create({ baseURL: import.meta.env.VITE_ACTIVITY_API });

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken(); 

    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
