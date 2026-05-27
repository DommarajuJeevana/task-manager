import axios from "axios";

const API_URL =
  "http://localhost:5000/api/tasks";

export const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL,
    config
  );

  return response.data;
};

export const createTask = async (
  taskData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    taskData,
    config
  );

  return response.data;
};

export const deleteTask = async (
  taskId,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${taskId}`,
    config
  );

  return response.data;
};

export const updateTask = async (
  taskId,
  updatedData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${taskId}`,
    updatedData,
    config
  );

  return response.data;
};