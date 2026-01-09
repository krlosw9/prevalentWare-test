import { Prisma, Movement } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IMovementRepository } from './interfaces';
import { prisma } from '@/lib/auth';

/**
 * Repositorio de Movimiento.
 * Extiende BaseRepository con métodos específicos de búsqueda para movimientos.
 */
export class MovementRepository extends BaseRepository<Movement, Prisma.MovementCreateInput, Prisma.MovementUpdateInput> implements IMovementRepository {
  constructor() {
    super(prisma.movement);
  }

  /**
   * Busca todos los movimientos de un usuario específico, ordenados por fecha descendente.
   * @param userId ID del usuario.
   * @returns Lista de movimientos del usuario.
   */
  async findByUserId(userId: string): Promise<Movement[]> {
    return this.delegate.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }
}