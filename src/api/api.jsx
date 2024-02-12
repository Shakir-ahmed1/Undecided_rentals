import axios from 'axios';

const url = 'http://localhost:5000'
const API = axios.create({ baseURL: url });

export const signIn = (formData) => API.post('/api/users/login', formData)
export const signUp = (formData) => API.post('/api/users/register', formData)