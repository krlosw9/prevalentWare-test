/**
 * Tipos para el dominio de Movimientos
 */

export type MovementConcept = 'INCOME' | 'EXPENSE';

export interface Movement {
  id: string;
  concept: MovementConcept;
  amount: number;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovementDTO {
  concept: MovementConcept;
  amount: number;
  date: Date | string;
}

export interface UpdateMovementDTO extends Partial<CreateMovementDTO> { }

export interface MovementWithUser extends Movement {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
