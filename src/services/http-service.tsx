import axios, { AxiosInstance,AxiosResponse,AxiosRequestConfig } from 'axios';

// Örnek bir yapılandırma
const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://api.example.com', // API'nin temel URL'si
  timeout: 10000, // Zaman aşımı süresi (milisaniye cinsinden)
  headers: {
    'Content-Type': 'application/json', // Örnek bir header
    // Diğer istekler için gerekli header'lar
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

// Response interceptor ekleme
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      const modifiedResponse:AxiosResponse<any> = {
        ...response,
        data: response.data,
        status: response.status,
      };
  
      return modifiedResponse;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance;
