import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';

export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const response = await apiClient.get('catalogue/products/', { params: filters });
      
      // Transform backend data to match frontend structure if needed
      return response.data.map(product => ({
        ...product,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.price),
        category: product.category_name || product.category?.slug || product.category, // Handle nested cat
        desc: product.description,
        img: product.image || 'https://via.placeholder.com/400x400?text=No+Image',
        inStock: product.in_stock,
        unit: product.unit,
        badge: product.badge,
        isRx: product.is_rx_required,
        tags: product.tags || [], // Backend might need to provide tags
      }));
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('catalogue/categories/');
      return response.data;
    },
  });
};
