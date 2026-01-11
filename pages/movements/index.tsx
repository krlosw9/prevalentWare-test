import { useState, type ReactElement } from 'react';
import { Button } from '@/client/shared/components/ui/button';
import { Card, CardContent } from '@/client/shared/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/client/shared/components/ui/dialog';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useMovements } from '@/client/features/movements/hooks/use-movements';
import { MovementsList } from '@/client/features/movements/components/movements-list';
import { CreateMovementForm } from '@/client/features/movements/components/create-movement-form';
import AppLayout from '@/client/shared/components/layout/app-layout';

import PageShell from '@/client/shared/components/layout/page-shell';
import PageHeader from '@/client/shared/components/layout/page-header';

import { LoadingState } from '@/client/shared/components/ui/loading-state';

const MovementsPage = () => {
  const { role, isPending: authLoading } = useAuth();
  const { movements, totalBalance, isLoading, error, refetch } = useMovements();
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    refetch();
  };

  if (authLoading || (isLoading && !movements)) {
    return (
      <PageShell>
        <LoadingState message='Preparando tablero de movimientos...' />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <div className='p-12 text-center text-red-500 bg-red-50 rounded-xl border border-red-100'>
          Error al cargar movimientos financieros.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        title='Ingresos y egresos'
        description='Gestiona y visualiza todos los movimientos de capital de la empresa.'
      >
        {role === 'ADMIN' && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className='shadow-sm'>Nuevo Movimiento</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
              </DialogHeader>
              <CreateMovementForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        )}
      </PageHeader>

      <Card className='border-slate-200 overflow-hidden shadow-sm'>
        <CardContent className='p-0'>
          <MovementsList
            movements={movements}
            totalBalance={totalBalance}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </PageShell>
  );
};

MovementsPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default MovementsPage;
