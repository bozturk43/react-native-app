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
      console.log("Product List", response.data.productList);
      return response.data.productList || [];
    } else {
      console.error(response.error);
      return [];
    }
  };