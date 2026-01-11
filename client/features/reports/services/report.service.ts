/**
 * Servicio para comunicación con la API de reportes
 */

import { apiClient } from '@/client/shared/services/api-client';
import type { ReportSummary } from '../types/report.types';

export const ReportService = {
  /**
   * Obtener datos resumidos y para el gráfico
   */
  async getSummary(): Promise<ReportSummary> {
    return apiClient.get<ReportSummary>('/api/reports');
  },

  /**
   * Descargar el reporte CSV
   */
  async downloadCSV(): Promise<void> {
    const response = await fetch('/api/reports/export');
    if (!response.ok) throw new Error('Error al descargar el reporte');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte-movimientos.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};
