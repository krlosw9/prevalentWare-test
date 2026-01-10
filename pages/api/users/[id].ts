import { withAuth } from '@/server/utils/api-middleware';
import { UserService } from '@/server/services/user.service';
import { UserRepository } from '@/server/repositories/user.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';
import { z } from 'zod';

// Dependency Injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * Esquema de validación para la edición de usuarios
 */
const UpdateUserSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').optional(),
  role: z
    .enum(['USER', 'ADMIN'], {
      message: 'El rol debe ser USER o ADMIN',
    })
    .optional(),
});

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar un usuario
 *     description: Actualiza el nombre o el rol de un usuario. Solo administradores.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Prohibido - Solo administradores.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  // Solo administradores pueden editar usuarios
  if (session.user.role !== 'ADMIN') {
    return res.status(403).json({
      message: 'Prohibido: solo los administradores pueden gestionar usuarios.',
    });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const validatedData = UpdateUserSchema.parse(req.body);
      const user = await userService.updateUser(id as string, validatedData);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.issues.map((e) => e.message),
        });
      }
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
