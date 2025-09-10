import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: 'http://localhost:1111', 

  withCredentials: true, 
}); 

export default axiosInstance;