  import axios, { AxiosResponse } from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { User } from "../context/AuthContext";

  export const loginFromService = async (userData: any): Promise<AxiosResponse<any>> => {
      try {
        const response = await axios.post('http://192.168.56.2:3000/api/auth', userData);
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

export const getUserPantries = async (user: User): Promise<any[]> => {
  console.log("USER TOKEN", user.token);
  try {
    const response = await axios.get('http://192.168.56.2:3000/api/user-info', {  // URL
      headers: {
        Authorization: `Bearer ${user.token}`,  // Bearer token
      },
    });
    console.log("DOLABIM", response.data);

    // Eğer gelen veri mevcutsa döndür, yoksa boş dizi döndür
    return response.data.items || []; // items yoksa boş dizi döner
  } catch (error) {
    console.error(error);  // Hata bilgisini konsola yazdır
    return []; // Hata durumunda da boş dizi döndür
  }
};
