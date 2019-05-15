import axios from "axios";
const BACKEND_URL = `${process.env.REACT_APP_SERVER_URL}`;

let service = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true
});

export const signup = userInfo =>
  service.post(`${BACKEND_URL}/auth/signup`, userInfo);

export const login = userInfo =>
  service.post(`${BACKEND_URL}/auth/login`, userInfo);
