import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

// const API_URL = 'https://mutfagim-next-api.vercel.app/api/'; // API base URL
const API_URL = 'http://192.168.56.2:3000/api/'; // API base URL


// Response şablonu
interface ApiResponse {
  success: boolean;
  data: any;
  error?: string;
}
export const httpGet = async(url: string, config?: AxiosRequestConfig): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_URL}${url}`, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('GET Error:', error.message);
    return {
      success: false,
      data: {},
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};

// // POST request
export const httpPost = async(url: string, body: any, config?: AxiosRequestConfig): Promise<ApiResponse> => {
  try {
    console.log("BODY HTTP SERVİCE",body);
    console.log("CONFIG HTTP SERVİCE",config);
    const response = await axios.post(`${API_URL}${url}`, body, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return {
      success: false,
      data: {},
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};
