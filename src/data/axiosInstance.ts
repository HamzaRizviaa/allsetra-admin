import axios from "axios";

const instance = axios.create({
  baseURL: "",
  responseType: "json",
});

export default instance;
