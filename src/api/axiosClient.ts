import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8001',  
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
