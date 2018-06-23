import * as axios from "axios";

// const URL_PREFIX = "http://localhost:50623";

export function users_googleSignin(data) {
  return axios.post("/api/users/googlesignin", data);
}

export function users_getAll() {
  return axios.get("/api/users");
}
