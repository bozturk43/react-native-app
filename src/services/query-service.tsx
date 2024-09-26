// services/productService.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '../context/AuthContext';
import { Product } from '../types/ObjectTypes';
import { getUserPantries } from './user-service';
import { getAllProducts } from './product-service';

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