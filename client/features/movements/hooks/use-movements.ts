/**
 * Hook para fetching de movimientos usando SWR
 */

import useSWR from 'swr';
import { fetcher } from '@/client/shared/services/api-client';
import type { MovementsResponse } from '../types/movement.types';

export function useMovements() {
  const { data, error, isLoading, mutate } = useSWR<MovementsResponse>(
    '/api/movements',
    fetcher
  );

  return {
    movements: data?.movements,
    totalBalance: data?.totalBalance,
    totalCount: data?.totalCount,
    isLoading,
    error,
    refetch: mutate,
  };
}
