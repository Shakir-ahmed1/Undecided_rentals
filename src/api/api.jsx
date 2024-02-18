import axios from "axios";

const url = "http://localhost:5000";
const API = axios.create({ baseURL: url });
const token = JSON.parse(localStorage.getItem("profile"))?.accessToken || null;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `${
      token
    }`;
  }
  return req;
});
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Set expiration time

  const cookieValue = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  document.cookie = cookieValue;
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Example usage

// Example usage
if (token) {
  setCookie(
    "accessToken",
    token,
    1
  );
} else {
  deleteCookie("accessToken");
}

export const signIn = (formData) => API.post("/api/users/login", formData);
export const signUp = (formData) => API.post("/api/users/register", formData);
export const updateUser = (userId, updatedUser) =>
  API.put(`/api/users/${userId}/profiles`, updatedUser);
