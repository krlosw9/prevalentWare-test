import { withAuth } from '@/server/utils/api-middleware';
import { MovementService } from '@/server/services/movement.service';
import { MovementRepository } from '@/server/repositories/movement.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';
import { z } from 'zod';

// Dependency Injection
const movementRepository = new MovementRepository();
const movementService = new MovementService(movementRepository);

/**
 * Esquema de validación para la creación de movimientos
 */
const CreateMovementSchema = z.object({
  concept: z.enum(['INCOME', 'EXPENSE'], {
    message: 'El concepto es obligatorio y debe ser INCOME o EXPENSE',
  }),
  amount: z.number().positive('El monto debe ser un número positivo'),
  date: z.string().datetime('Fecha inválida'),
});

/**
 * @openapi
 * /api/movements:
 *   get:
 *     summary: Obtener todos los movimientos
 *     description: Retorna una lista de todos los ingresos y egresos registrados junto con el total.
 *     responses:
 *       200:
 *         description: Lista de movimientos y totales obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movement'
 *                 totalCount:
 *                   type: number
 *                 totalBalance:
 *                   type: number
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
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === 'GET') {
    const response = await movementService.getMovements();
    return res.status(200).json(response);
  }

  if (req.method === 'POST') {
    if (session.user.role !== 'ADMIN') {
      return res.status(403).json({
        message:
          'Prohibido: solo los administradores pueden crear movimientos.',
      });
    }

    try {
      // Validación con Zod (incluye sanitización implícita)
      const validatedData = CreateMovementSchema.parse(req.body);

      const movement = await movementService.createMovement({
        ...validatedData,
        user: { connect: { id: session.user.id } },
      });

      return res.status(201).json(movement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.issues.map((e) => e.message),
        });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
