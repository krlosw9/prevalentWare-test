/**
 * Servicio para comunicación con la API de usuarios
 */

import { apiClient } from '@/client/shared/services/api-client';
import type { User, UpdateUserDTO } from '../types/user.types';

export const UserService = {
	/**
	 * Obtener todos los usuarios
	 */
	async getAll(): Promise<User[]> {
		return apiClient.get<User[]>('/api/users');
	},

	/**
	 * Actualizar un usuario existente
	 */
	async update(id: string, data: UpdateUserDTO): Promise<User> {
		return apiClient.patch<User>(`/api/users/${id}`, data);
	},
};
