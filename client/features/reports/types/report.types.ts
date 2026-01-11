/**
 * Tipos para el dominio de Reportes
 */

export interface ChartDataItem {
  date: string;
  income: number;
  expense: number;
}

export interface ReportSummary {
  totalBalance: number;
  chartData: ChartDataItem[];
}
