import { withAuth } from '@/server/utils/api-middleware';
import { MovementService } from '@/server/services/movement.service';
import { MovementRepository } from '@/server/repositories/movement.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';

// Dependency Injection
const movementRepository = new MovementRepository();
const movementService = new MovementService(movementRepository);

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  if (req.method === 'GET') {
    const movements = await movementService.getMovements();
    return res.status(200).json(movements);
  }

  if (req.method === 'POST') {
    if (session.user.role !== 'ADMIN') {
      return res.status(403).json({
        message:
          'Prohibido: solo los administradores pueden crear movimientos.',
      });
    }

    const { concept, amount, date } = req.body;

    if (!concept || !amount || !date) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const movement = await movementService.createMovement({
      concept,
      amount,
      date: new Date(date),
      type: req.body.type || 'EXPENSE',
      user: { connect: { id: session.user.id } },
    });

    return res.status(201).json(movement);
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
