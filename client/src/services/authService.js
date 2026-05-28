import axios from "axios";

import { BASE_URL } from "../config/api";

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    userData
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    userData
  );

  return response.data;
};
