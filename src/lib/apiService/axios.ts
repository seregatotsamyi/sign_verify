import axios from "axios";

export const instance = axios.create({
  headers: {
    accept: "application/json",
  },
  withCredentials: true,

  baseURL: "http://localhost:3000/api/",
});
