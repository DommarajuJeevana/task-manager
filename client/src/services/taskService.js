import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API}/api/tasks`,
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
    `${API}/api/tasks`,
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
    `${API}/api/tasks/${taskId}`,
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
    `${API}/api/tasks/${taskId}`,
    updatedData,
    config
  );

  return response.data;
};
