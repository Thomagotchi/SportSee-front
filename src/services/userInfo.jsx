import axios from "axios";

export async function getUserPerformance({ id }) {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${id}/performance`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserActivity({ id }) {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${id}/activity`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserAverage({ id }) {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${id}/average-sessions`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser({ id }) {
  try {
    const response = await axios.get(`http://localhost:3001/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
