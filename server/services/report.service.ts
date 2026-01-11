import { IMovementRepository } from '../repositories/interfaces';

export class ReportService {
  constructor(private movementRepository: IMovementRepository) { }

  /**
   * Obtiene los datos para el reporte financiero.
   */
  async getReportData() {
    const [totals, dailySummary] = await Promise.all([
      this.movementRepository.getTotals(),
      this.movementRepository.getDailySummary(),
    ]);

    return {
      totalBalance: totals.totalBalance,
      chartData: dailySummary,
    };
  }

  /**
   * Genera el contenido de un archivo CSV basado en todos los movimientos.
   */
  async generateCSV(): Promise<string> {
    const movements = await this.movementRepository.findAll();

    const headers = ['Concepto', 'Monto', 'Fecha', 'Usuario'];
    const rows = movements.map(m => {
      const concept = m.concept === 'INCOME' ? 'Ingreso' : 'Egreso';
      const amount = m.amount.toString();
      const date = new Date(m.date).toLocaleDateString();
      const user = (m as any).user?.name || 'Sistema';

      return [concept, amount, date, user].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
