import { User } from "../context/AuthContext";
import { httpGet } from "./http-service";

export const getAllProducts = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    const response = await httpGet('all-products', config);
    if (response.success) {
      return response.data.productList || [];
    } else {
      console.error(response.error);
      return [];
    }
  };

  export const getFoodCategories = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    const response = await httpGet('get-categories', config);
    if (response.success) {
      return response.data.categoryList || [];
    } else {
      console.error(response.error);
      return [];
    }
  };