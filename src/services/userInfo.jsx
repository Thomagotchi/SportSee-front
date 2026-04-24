import axios from "axios";
import mockData from "../data/mock.json";

const DEFAULT_ID = 12;

export function getUserFromParams() {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  const id = parseInt(segment, 10);
  if (!isNaN(id) && id !== 1) return { id, isMock: false };
  return { id: null, isMock: true };
}

export async function getUser({ id, isMock }) {
  if (isMock) return mockData.user;
  try {
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    return response.data;
  } catch {
    const response = await axios.get(`http://localhost:3000/user/${DEFAULT_ID}`);
    return response.data;
  }
}

export async function getUserActivity({ id, isMock }) {
  if (isMock) return mockData.userActivity;
  try {
    const response = await axios.get(`http://localhost:3000/user/${id}/activity`);
    return response.data;
  } catch {
    const response = await axios.get(`http://localhost:3000/user/${DEFAULT_ID}/activity`);
    return response.data;
  }
}

export async function getUserAverage({ id, isMock }) {
  if (isMock) return mockData.userSessions;
  try {
    const response = await axios.get(`http://localhost:3000/user/${id}/average-sessions`);
    return response.data;
  } catch {
    const response = await axios.get(`http://localhost:3000/user/${DEFAULT_ID}/average-sessions`);
    return response.data;
  }
}

export async function getUserPerformance({ id, isMock }) {
  if (isMock) return mockData.userPerformance;
  try {
    const response = await axios.get(`http://localhost:3000/user/${id}/performance`);
    return response.data;
  } catch {
    const response = await axios.get(`http://localhost:3000/user/${DEFAULT_ID}/performance`);
    return response.data;
  }
}
