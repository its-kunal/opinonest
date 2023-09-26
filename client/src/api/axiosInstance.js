import axios from "axios";

const serverURL = "http://localhost:3000";

const instance = axios.create({
  baseURL: serverURL,
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

instance.interceptors.response.use(
  (_res) => {
    return _res;
  },
  (err) => {
    if (err.response.status == 401) {
      localStorage.removeItem("token");
    }
  }
);

export default instance;
