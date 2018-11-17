import * as axios from "axios";

// const URL_PREFIX = "http://localhost:50623";

export function users_googleSignin(data) {
  return axios.post("/api/users/googlesignin", data);
}

export function users_getAll() {
  return axios.get("/api/users");
}

export function users_getById(id) {
  return axios.get("/api/users/" + id);
}

export function users_update(data) {
  return axios.put("/api/users/" + data.id, data);
}

export function users_delete(id) {
  return axios.delete("/api/users/" + id);
}

export function users_getCurrentUser() {
  return axios.get("/api/users/getcurrentuser");
}