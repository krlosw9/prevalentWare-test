import { useState } from 'react';

import { Button } from '@/client/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/client/shared/components/ui/card';
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

const MovementsPage = () => {
  const { role } = useAuth();
  const { movements, isLoading, error, refetch } = useMovements();
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    refetch();
  };

  if (error) {
    return <div className='p-8 text-red-500'>Error al cargar movimientos</div>;
  }

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Ingresos y egresos</CardTitle>
          {role === 'ADMIN' && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Nuevo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
                </DialogHeader>
                <CreateMovementForm onSuccess={handleSuccess} />
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          <MovementsList movements={movements} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementsPage;
