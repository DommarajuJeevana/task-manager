import axios from "axios";

import { BASE_URL } from "../config/api";
export const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BASE_URL}/api/tasks`,
    config
  );

  return response.data;
};

export const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/api/tasks`,
    taskData,
    config
  );

  return response.data;
};

export const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${BASE_URL}/api/tasks/${taskId}`,
    config
  );

  return response.data;
};

export const updateTask = async (taskId, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${BASE_URL}/api/tasks/${taskId}`,
    updatedData,
    config
  );

  return response.data;
};
