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

  /**
   * Obtiene un resumen diario de ingresos y egresos ordenados por fecha.
   */
  async getDailySummary(): Promise<any[]> {
    const movements = await prisma.movement.findMany({
      orderBy: { date: 'asc' },
      select: {
        date: true,
        amount: true,
        concept: true,
      }
    });

    const summary: Record<string, { date: string; income: number; expense: number }> = {};

    movements.forEach(m => {
      const dateStr = m.date.toISOString().split('T')[0];
      if (!summary[dateStr]) {
        summary[dateStr] = { date: dateStr, income: 0, expense: 0 };
      }

      const amount = Number(m.amount);
      if (m.concept === 'INCOME') {
        summary[dateStr].income += amount;
      } else {
        summary[dateStr].expense += amount;
      }
    });

    return Object.values(summary);
  }
}