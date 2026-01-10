import { Prisma, User } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IUserRepository } from './interfaces';
import { prisma } from '@/lib/auth';

/**
 * Repositorio de Usuario.
 * Implementa las operaciones CRUD básicas para la entidad User.
 */
export class UserRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> implements IUserRepository {
  constructor() {
    super(prisma.user);
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email Correo electrónico del usuario.
   * @returns El usuario encontrado o null si no existe.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.delegate.findUnique({
      where: { email } as any,
    });
  }

  /**
   * Sobrescribe findAll para ordenar por nombre.
   */
  async findAll(): Promise<User[]> {
    return this.delegate.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
