/**
 * Hook para fetching de movimientos usando SWR
 */

import useSWR from 'swr';
import { fetcher } from '@/client/shared/services/api-client';
import type { Movement } from '../types/movement.types';

export function useMovements() {
  const { data, error, isLoading, mutate } = useSWR<Movement[]>(
    '/api/movements',
    fetcher
  );

  return {
    movements: data,
    isLoading,
    error,
    refetch: mutate,
  };
}
