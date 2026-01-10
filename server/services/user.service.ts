import { User, Prisma } from '@prisma/client';
import { IUserRepository } from '../repositories/interfaces';

export class UserService {
  constructor(private userRepository: IUserRepository) { }

  /**
   * Obtiene todos los usuarios.
   * @returns Lista de usuarios ordenada por nombre.
   */
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Busca un usuario por ID.
   * @param id ID del usuario.
   * @returns El usuario encontrado o lanza error si no existe.
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  /**
   * Actualiza la información de un usuario.
   * Solo permite actualizar nombre y rol según requerimientos.
   * @param id ID del usuario a actualizar.
   * @param data Datos a actualizar.
   * @returns El usuario actualizado.
   */
  async updateUser(id: string, data: { name?: string; role?: any }): Promise<User> {
    // Validar que el usuario existe antes de actualizar
    await this.getUserById(id);

    const updateData: Prisma.UserUpdateInput = {};

    if (data.name !== undefined) {
      if (!data.name.trim()) {
        throw new Error('El nombre no puede estar vacío');
      }
      updateData.name = data.name;
    }

    if (data.role !== undefined) {
      updateData.role = data.role;
    }

    return this.userRepository.update(id, updateData);
  }
}
