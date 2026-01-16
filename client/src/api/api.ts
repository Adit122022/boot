import axios from "axios";

export const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const endpoints = {
  auth: {
    signup: "/auth/signup",
    signin: "/auth/signin",
  },
  content: {
    add: "/content/",
    get: "/content/",
    delete: "/content/", // + contentId in body for DELETE? Or query param? Backend README says body.
  },
  share: {
    share: "/brain/share",
    get: "/brain/", // + shareLink
  },
};

export default api;
