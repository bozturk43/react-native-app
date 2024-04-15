import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../context/AuthContext";

export const loginFromService = async (userData: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await axios.post('https://reqres.in/api/login', userData);
      return response;
    } catch (error) {
      throw new Error("Failed Login"); // Hata yönetimi burada düzenlenebilir
    }
  };
export async function getUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
        try {
            const user: User = JSON.parse(userData);
            return user;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    } else {
        return null;
    }
}