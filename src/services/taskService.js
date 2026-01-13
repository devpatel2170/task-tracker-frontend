import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const getAllTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
