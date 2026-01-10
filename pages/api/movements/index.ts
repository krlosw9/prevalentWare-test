import { withAuth } from '@/server/utils/api-middleware';
import { MovementService } from '@/server/services/movement.service';
import { MovementRepository } from '@/server/repositories/movement.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';

// Dependency Injection
const movementRepository = new MovementRepository();
const movementService = new MovementService(movementRepository);

/**
 * @openapi
 * /api/movements:
 *   get:
 *     summary: Obtener todos los movimientos
 *     description: Retorna una lista de todos los ingresos y egresos registrados.
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 *   post:
 *     summary: Crear un nuevo movimiento
 *     description: Registra un nuevo ingreso o egreso. Solo disponible para administradores.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - concept
 *               - amount
 *               - date
 *             properties:
 *               concept:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Prohibido - Solo administradores.
 *
 * components:
 *   schemas:
 *     Movement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         concept:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         amount:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: string
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
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
