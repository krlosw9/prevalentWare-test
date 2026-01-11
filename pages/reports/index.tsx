import { Card } from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useReports } from '@/client/features/reports/hooks/use-reports';
import { FinancialChart } from '@/client/features/reports/components/financial-chart';
import { ReportHeader } from '@/client/features/reports/components/report-header';
import { BalanceCard } from '@/client/features/reports/components/balance-card';
import { useState, type ReactElement } from 'react';
import AppLayout from '@/client/shared/components/layout/app-layout';

const ReportsPage = () => {
  const { role, isPending: authLoading } = useAuth();
  const { reportData, isLoading: reportsLoading, exportCSV } = useReports();
  const [isExporting, setIsExporting] = useState(false);

  if (authLoading || reportsLoading) {
    return (
      <div className='flex items-center justify-center p-12'>
        <p className='text-lg text-slate-500 animate-pulse'>
          Cargando reportes...
        </p>
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
    <div className='space-y-8'>
      <ReportHeader onExport={handleExport} isExporting={isExporting} />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <BalanceCard balance={reportData?.totalBalance || 0} />
      </div>

      <div className='w-full'>
        {hasChartData ? (
          <FinancialChart data={reportData!.chartData} />
        ) : (
          <Card className='p-12 text-center text-slate-500 border-slate-200'>
            No hay movimientos registrados para mostrar en el gráfico
          </Card>
        )}
      </div>
    </div>
  );
};

ReportsPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default ReportsPage;
