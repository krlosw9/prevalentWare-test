import useSWR from 'swr';
import { fetcher } from '@/client/shared/services/api-client';
import { User } from '../types/user.types';
import { UserService } from '../services/user.service';

/**
 * Hook para gestionar los usuarios con SWR
 */
export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<User[]>('/api/users', fetcher);

  const updateUser = async (id: string, name: string, role: 'ADMIN' | 'USER') => {
    try {
      const updatedUser = await UserService.update(id, { name, role });
      // Actualizar el caché local de forma optimista
      if (data) {
        mutate(
          data.map((user) => (user.id === id ? updatedUser : user)),
          false
        );
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return {
    users: data || [],
    isLoading,
    isError: error,
    updateUser,
    mutate,
  };
}
