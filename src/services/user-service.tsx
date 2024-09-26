  import axios, { AxiosResponse } from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { User } from "../context/AuthContext";
import { httpGet, httpPost } from "./http-service";
import { HttpServiceReturnObject } from "../types/ObjectTypes";

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
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await httpGet('user-info', config);
  if (response.success) {
    console.log("DOLABIM", response.data.items);
    return response.data.items || [];
  } else {
    console.error(response.error);
    return [];
  }
};
export const addProductToPantry = async (user: User,productId:string,quantity:number): Promise<HttpServiceReturnObject> => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  console.log("Prd Id",productId);
  console.log("Qty",quantity);
  const body = {
    productId,
    quantity,
  };
  const response = await httpPost('add-to-pantry', body,config);
  if (response.success) {
    const returnObject:HttpServiceReturnObject ={
      code:0,
      message:"İslem Basarılı"
    } 
    return returnObject
  } else {
    console.error(response.error);
    const returnObject:HttpServiceReturnObject ={
      code:1,
      message:"İslem Sırasında Bir Hata Oluştu"
    }
    return returnObject
  }
};
export const updateProductQuantityToPantry = async (user: User,productId:string,quantity:number): Promise<HttpServiceReturnObject> => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const body = {
    productId,
    quantity,
  };
  const response = await httpPost('update-pantry', body,config);
  if (response.success) {
    const returnObject:HttpServiceReturnObject ={
      code:0,
      message:"İslem Basarılı"
    }
    return returnObject
  } else {
    console.error(response.error);
    const returnObject:HttpServiceReturnObject ={
      code:1,
      message:"İslem Sırasında Bir Hata Oluştu"
    }
    return returnObject
  }
};
export const deleteProductFromPantry = async (user:User,productId:string):Promise<HttpServiceReturnObject>=>{
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const body = {productId};
  const response = await httpPost('delete-from-pantry', body,config);

  if (response.success) {
    const returnObject:HttpServiceReturnObject ={
      code:0,
      message:"İslem Basarılı"
    } 
    return returnObject
  } else {
    console.error(response.error);
    const returnObject:HttpServiceReturnObject ={
      code:1,
      message:"İslem Sırasında Bir Hata Oluştu"
    }
    return returnObject
  }

}
