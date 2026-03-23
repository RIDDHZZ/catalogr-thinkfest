import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export async function generateContent(formData) {
  const res = await API.post('/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function fetchHistory() {
  const res = await API.get('/generate/history');
  return res.data;
}

export async function fetchGeneration(id) {
  const res = await API.get(`/generate/${id}`);
  return res.data;
}