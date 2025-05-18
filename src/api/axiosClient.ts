import axios from 'axios';



const axiosClient = axios.create({
  // baseURL: 'https://api-node-himno-production.up.railway.app' ,  
  baseURL: 'http://localhost:8001' ,  
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
