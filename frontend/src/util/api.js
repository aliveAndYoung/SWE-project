import axios from 'axios';

const BASE_URL = 'http://localhost:3030';

export async function apiGet(route, token, params = {}) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${BASE_URL}${route}`, {
    headers,
    params,
    withCredentials: true,
  });
  return response.data;
}

export async function apiPost(route, data = {}, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.post(`${BASE_URL}${route}`, data, {
    headers,
    withCredentials: true,
  });
  return response.data;
}

export async function apiPut(route, data = {}, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.put(`${BASE_URL}${route}`, data, {
    headers,
    withCredentials: true,
  });
  return response.data;
} 