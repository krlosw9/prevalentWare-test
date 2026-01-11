import { Card } from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useReports } from '@/client/features/reports/hooks/use-reports';
import { FinancialChart } from '@/client/features/reports/components/financial-chart';
import { ReportHeader } from '@/client/features/reports/components/report-header';
import { BalanceCard } from '@/client/features/reports/components/balance-card';
import { useState } from 'react';

const ReportsPage = () => {
  const { role, isPending: authLoading } = useAuth();
  const { reportData, isLoading: reportsLoading, exportCSV } = useReports();
  const [isExporting, setIsExporting] = useState(false);

  if (authLoading || reportsLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg'>Cargando reportes...</p>
      </div>
    );
  }

  if (role !== 'ADMIN') return null;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportCSV();
    } finally {
      setIsExporting(false);
    }
  };

  const hasChartData = reportData && reportData.chartData.length > 0;

  return (
    <div className='container mx-auto py-10 px-4 space-y-8'>
      <ReportHeader onExport={handleExport} isExporting={isExporting} />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <BalanceCard balance={reportData?.totalBalance || 0} />
      </div>

      <div className='w-full'>
        {hasChartData ? (
          <FinancialChart data={reportData!.chartData} />
        ) : (
          <Card className='p-12 text-center text-slate-500'>
            No hay movimientos registrados para mostrar en el gráfico
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
