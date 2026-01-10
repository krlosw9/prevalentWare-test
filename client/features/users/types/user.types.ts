/**
 * Tipos para el dominio de Usuarios
 */

export type UserRole = 'ADMIN' | 'USER';

export interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null;
	createdAt: Date | string;
	updatedAt: Date | string;
	role: UserRole;
	phone?: string | null;
}

export interface UpdateUserDTO {
	name?: string;
	role?: UserRole;
}
