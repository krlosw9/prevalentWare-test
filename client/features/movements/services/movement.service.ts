/**
 * Servicio para comunicación con la API de movimientos
 */

import { apiClient } from '@/client/shared/services/api-client';
import type { Movement, CreateMovementDTO, UpdateMovementDTO } from '../types/movement.types';

export const MovementService = {
  /**
   * Obtener todos los movimientos
   */
  async getAll(): Promise<Movement[]> {
    return apiClient.get<Movement[]>('/api/movements');
  },

  /**
   * Crear un nuevo movimiento
   */
  async create(data: CreateMovementDTO): Promise<Movement> {
    return apiClient.post<Movement>('/api/movements', data);
  },

  /**
   * Actualizar un movimiento existente
   */
  async update(id: string, data: UpdateMovementDTO): Promise<Movement> {
    return apiClient.put<Movement>(`/api/movements/${id}`, data);
  },

  /**
   * Eliminar un movimiento
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/movements/${id}`);
  },
};
