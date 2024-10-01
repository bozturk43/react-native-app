// services/productService.ts
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { User } from '../context/AuthContext';
import { Product } from '../types/ObjectTypes';
import { getUserPantries } from './user-service';
import { getAllProducts, getFoodCategories } from './product-service';
import { getAvailableFoods,getRecipeDetailById } from './recipe-service';

export const usePantriesQuery = (user: User | null) => {
  return useQuery<Product[]>({
    queryKey: ['fetchPantryItems'],
    queryFn: async () => {
      if (user) {
        const items = await getUserPantries(user);
        return items;
      }
      return [];
    },
    enabled: !!user,
  });
};
export const useProductsQuery = (user: User | null) => {
    return useQuery<Product[]>({
      queryKey: ['fetchAllProducts'],
      queryFn: async () => {
        if (user) {
          const items = await getAllProducts(user);
          return items;
        }
        return [];
      },
      enabled: !!user,
    });
  };
  export const useAvailableFoodsQuery = (user: User | null): {
    data: any; 
    isLoading: boolean; 
    error: Error | null; // Hata durumu ekleniyor
    refetch: () => Promise<QueryObserverResult<any, Error>> 
  } => {
    const query = useQuery<any>({
      queryKey: ['fetchAvailableFoods'],
      queryFn: async () => {
        if (user) {
          const data = await getAvailableFoods(user);
          return data;
        }
        return [];
      },
      enabled: !!user,
    });
  
    return { 
      data: query.data, 
      isLoading: query.isLoading, 
      error: query.error, // Hata durumu döndürülüyor
      refetch: query.refetch 
    };
  };

  export const useFoodCategories = (user: User | null) => {
    return useQuery<any>({
      queryKey: ['fetchFoodCategories'],
      queryFn: async () => {
        if (user) {
          const data = await getFoodCategories(user);
          return data;
        }
        return [];
      },
      enabled: !!user,
    });
  };

  export const useRecipeDetails = (user: User | null, recipeId: string | null) => {
    return useQuery<any>({
      queryKey: ['fetchRecipeDetails', recipeId],
      queryFn: async () => {
        if (user && recipeId) {
          const data = await getRecipeDetailById(user, recipeId);
          return data;
        }
        return null; // Eğer user veya recipeId yoksa null döndür
      },
      enabled: !!user && !!recipeId, // Hem user hem de recipeId varsa sorgu aktif olur
    });
  };