import axios, { AxiosResponse } from "axios";

export const loginFromService = async (userData: LoginDataType): Promise<AxiosResponse<any>> => {
    try {
      console.log("USER DATA IN SERVICE",userData);
      const response = await axios.post('https://reqres.in/api/login', userData);
      return response;
    } catch (error) {
      console.log(error)
      throw new Error("Failed Login"); // Hata yönetimi burada düzenlenebilir
    }
  };