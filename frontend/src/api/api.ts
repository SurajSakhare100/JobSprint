import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Make sure this matches your backend API URL
});

export const fetchFeaturedJobs = async (categoryId: number) => {
  const response = await api.get(`/jobs/featured?category=${categoryId}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
