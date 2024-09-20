  import axios, { AxiosResponse } from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { User } from "../context/AuthContext";

  export const loginFromService = async (userData: any): Promise<AxiosResponse<any>> => {
    console.log(userData);
      try {
        const response = await axios.post('https://mutfagim-api.vercel.app/api/auth', userData);
        console.log(response);
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
  export const logout = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem("user");
        // Çıkış işlemi sonrası gerekli işlemleri burada yapabilirsiniz (örn. navigasyon)
    } catch (error) {
        console.error("Error during logout:", error);
        // Hata yönetimi burada düzenlenebilir
    }
};