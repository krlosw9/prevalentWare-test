import useSWR from 'swr';
import { fetcher } from '@/client/shared/services/api-client';
import type { ReportSummary } from '../types/report.types';
import { ReportService } from '../services/report.service';

/**
 * Hook para gestionar los datos de reportes con SWR
 */
export function useReports() {
  const { data, error, isLoading, mutate } = useSWR<ReportSummary>('/api/reports', fetcher);

  const exportCSV = async () => {
    try {
      await ReportService.downloadCSV();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      throw error;
    }
  };

  return {
    reportData: data,
    isLoading,
    isError: error,
    exportCSV,
    mutate,
  };
}
