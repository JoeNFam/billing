import axios from "axios";
const BASE_URL = "/api";

export async function getStatus() {
  return axios.get(`${BASE_URL}/status`).then(r => r.data);
}
export async function getInterfaces() {
  return axios.get(`${BASE_URL}/interfaces`).then(r => r.data);
}
export async function getLeases() {
  return axios.get(`${BASE_URL}/leases`).then(r => r.data);
}
export async function getUsers() {
  return axios.get(`${BASE_URL}/users`).then(r => r.data);
}
export async function addUser(user) {
  return axios.post(`${BASE_URL}/users`, user).then(r => r.data);
}
export async function deleteUser(id) {
  return axios.delete(`${BASE_URL}/users/${id}`).then(r => r.data);
}
export async function rebootRouter() {
  return axios.post(`${BASE_URL}/reboot`).then(r => r.data);
}