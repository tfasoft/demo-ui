import axios from "axios";

const env = process.env;

const API = axios.create({
  baseURL: env.REACT_APP_BACKEND_API,
});

export default API;
