import { Card } from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useReports } from '@/client/features/reports/hooks/use-reports';
import { FinancialChart } from '@/client/features/reports/components/financial-chart';
import { BalanceCard } from '@/client/features/reports/components/balance-card';
import { useState, type ReactElement } from 'react';
import AppLayout from '@/client/shared/components/layout/app-layout';

import PageShell from '@/client/shared/components/layout/page-shell';
import PageHeader from '@/client/shared/components/layout/page-header';
import { Button } from '@/client/shared/components/ui/button';
import { Download } from 'lucide-react';

import { LoadingState } from '@/client/shared/components/ui/loading-state';

const ReportsPage = () => {
  const { role, isPending: authLoading } = useAuth();
  const { reportData, isLoading: reportsLoading, exportCSV } = useReports();
  const [isExporting, setIsExporting] = useState(false);

  if (authLoading || reportsLoading) {
    return (
      <PageShell>
        <LoadingState message="Cargando reportes financieros..." />
      </PageShell>
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
    <PageShell>
      <PageHeader
        title="Reportes Financieros"
        description="Analiza el rendimiento económico y exporta balances detallados."
      >
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={isExporting}
          className="shadow-sm"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Exportando...' : 'Exportar CSV'}
        </Button>
      </PageHeader>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <BalanceCard balance={reportData?.totalBalance || 0} />
      </div>

      <div className='w-full'>
        {hasChartData ? (
          < FinancialChart data={reportData!.chartData} />
        ) : (
          <Card className='p-12 text-center text-slate-500 border-slate-200 shadow-sm'>
            No hay movimientos registrados para mostrar en el gráfico
          </Card>
        )}
      </div>
    </PageShell>
  );
};

ReportsPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default ReportsPage;
