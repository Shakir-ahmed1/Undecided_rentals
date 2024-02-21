import axios from "axios";

const url = "http://localhost:5000";
const API = axios.create({ baseURL: url ,
	withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	credentials: 'include',
});
const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
API.interceptors.request.use(
  (config) => {
    // Assuming you store the access token in localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post("/api/users/login", formData);
export const signUp = (formData) => API.post("/api/users/register", formData);
export const updateUser = (userId, updatedUser) =>
  API.put(`/api/users/${userId}/profiles`, updatedUser);
export const getProfile = (userId) => 
  API.get(`/api/users/${userId}/profiles`);
