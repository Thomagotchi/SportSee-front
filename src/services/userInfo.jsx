import axios from "axios";
import mockData from "../data/mock.json";

export function getUserFromParams() {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];

  if (segment === "mock") return { id: null, isMock: true };

  const id = parseInt(segment, 10);
  if (!isNaN(id)) return { id, isMock: false };

  return { id: null, isMock: false };
}

export async function getUser({ id, isMock }) {
  if (isMock) return mockData.user;
  const response = await axios.get(`http://localhost:3000/user/${id}`);
  return response.data;
}

export async function getUserActivity({ id, isMock }) {
  if (isMock) return mockData.userActivity;
  const response = await axios.get(`http://localhost:3000/user/${id}/activity`);
  return response.data;
}

export async function getUserAverage({ id, isMock }) {
  if (isMock) return mockData.userSessions;
  const response = await axios.get(
    `http://localhost:3000/user/${id}/average-sessions`,
  );
  return response.data;
}

export async function getUserPerformance({ id, isMock }) {
  if (isMock) return mockData.userPerformance;
  const response = await axios.get(
    `http://localhost:3000/user/${id}/performance`,
  );
  return response.data;
}
