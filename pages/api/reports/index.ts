import { withAuth } from '@/server/utils/api-middleware';
import { ReportService } from '@/server/services/report.service';
import { MovementRepository } from '@/server/repositories/movement.repository';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@/lib/auth';

// Dependency Injection
const movementRepository = new MovementRepository();
const reportService = new ReportService(movementRepository);

/**
 * @openapi
 * /api/reports:
 *   get:
 *     tags: [Reports]
 *     summary: Obtener datos para reportes
 *     description: Retorna el balance total y los datos agrupados por día para el gráfico. Solo administradores.
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Prohibido: solo administradores' });
  }

  if (req.method === 'GET') {
    try {
      const data = await reportService.getReportData();
      return res.status(200).json(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
