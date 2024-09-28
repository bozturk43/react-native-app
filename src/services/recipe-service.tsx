import { User } from "../context/AuthContext";
import { httpGet } from "./http-service";

export const getAvailableFoods = async (user: User): Promise<any[]> => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await httpGet('available-foods', config);
    if (response.success) {
        console.log(response.data)
      return response.data || [];
    } else {
      console.error(response.error);
      return [];
    }
  };