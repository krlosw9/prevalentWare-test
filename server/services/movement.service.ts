import { Movement, Prisma } from '@prisma/client';
import { IMovementRepository } from '../repositories/interfaces';

export class MovementService {
  constructor(private movementRepository: IMovementRepository) { }

  async getMovements(): Promise<Movement[]> {
    return this.movementRepository.findAll();
  }

  async createMovement(data: Prisma.MovementCreateInput): Promise<Movement> {
    const amount = new Prisma.Decimal(data.amount as string | number | Prisma.Decimal);
    if (amount.lte(0)) {
      throw new Error('El monto debe ser mayor a 0');
    }

    return this.movementRepository.create(data);
  }
}
