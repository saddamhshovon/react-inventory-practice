import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosBase = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

axiosBase.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosBase.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function get(url, data, config = {}) {
  return await axiosBase
    .get(url, data, { ...config })
    .then((response) => response);
}

export async function post(url, data, config = {}) {
  return axiosBase.post(url, data, { ...config }).then((response) => response);
}

export async function del(url, config = {}) {
  return await axiosBase
    .delete(url, { ...config })
    .then((response) => response);
}
