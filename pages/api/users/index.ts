import { withAuth } from '@/server/utils/api-middleware';
import { UserService } from '@/server/services/user.service';
import { UserRepository } from '@/server/repositories/user.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';

// Dependency Injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios registrados. Solo administradores.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Prohibido - Solo administradores.
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  // Solo administradores pueden listar usuarios
  if (session.user.role !== 'ADMIN') {
    return res.status(403).json({
      message: 'Prohibido: solo los administradores pueden gestionar usuarios.',
    });
  }

  if (req.method === 'GET') {
    try {
      const users = await userService.getUsers();
      return res.status(200).json(users);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
