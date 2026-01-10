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
   * Obtiene todos los movimientos incluyendo la información del usuario, ordenados por fecha descendente.
   * @returns Array de movimientos con usuario.
   */
  async findAll(): Promise<Movement[]> {
    return (this.delegate as any).findMany({
      include: { user: true },
      orderBy: { date: 'desc' },
    });
  }

  /**
   * Busca todos los movimientos de un usuario específico, ordenados por fecha descendente.
   * @param userId ID del usuario.
   * @returns Lista de movimientos del usuario con información de usuario.
   */
  async findByUserId(userId: string): Promise<Movement[]> {
    return (this.delegate as any).findMany({
      where: { userId },
      include: { user: true },
      orderBy: { date: 'desc' },
    });
  }

  /**
   * Obtiene los totales agregados (balance total y conteo) directamente de la base de datos.
   * Realiza la suma de INCOME y resta de EXPENSE.
   */
  async getTotals(): Promise<{ totalBalance: number; totalCount: number }> {
    const [incomeAgg, expenseAgg, count] = await Promise.all([
      prisma.movement.aggregate({
        where: { concept: 'INCOME' },
        _sum: { amount: true },
      }),
      prisma.movement.aggregate({
        where: { concept: 'EXPENSE' },
        _sum: { amount: true },
      }),
      prisma.movement.count(),
    ]);

    const income = Number(incomeAgg._sum.amount || 0);
    const expense = Number(expenseAgg._sum.amount || 0);

    return {
      totalBalance: income - expense,
      totalCount: count,
    };
  }
}