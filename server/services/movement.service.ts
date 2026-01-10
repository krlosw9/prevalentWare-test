import { Movement, Prisma } from '@prisma/client';
import { IMovementRepository } from '../repositories/interfaces';

export interface MovementsResponse {
  movements: Movement[];
  totalCount: number;
  totalBalance: number;
}

export class MovementService {
  constructor(private movementRepository: IMovementRepository) { }

  async getMovements(): Promise<MovementsResponse> {
    const [movements, totals] = await Promise.all([
      this.movementRepository.findAll(),
      this.movementRepository.getTotals(),
    ]);

    return {
      movements,
      ...totals,
    };
  }

  async createMovement(data: any): Promise<Movement> {
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('El monto debe ser un número válido mayor a 0');
    }

    data.amount = amount;
    return this.movementRepository.create(data);
  }
}
