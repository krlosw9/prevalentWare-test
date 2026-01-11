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
 * /api/reports/export:
 *   get:
 *     summary: Exportar movimientos a CSV
 *     description: Genera y descarga un archivo CSV con todos los movimientos registrados. Solo administradores.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo CSV generado exitosamente.
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
      const csv = await reportService.generateCSV();

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=reporte-movimientos.csv'
      );

      return res.status(200).send(csv);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
};

export default withAuth(handler);
