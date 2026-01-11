/**
 * Componente de lista de movimientos
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/client/shared/components/ui/table';
import type { Movement } from '../types/movement.types';
import { LoadingState } from '@/client/shared/components/ui/loading-state';

interface MovementsListProps {
  movements?: Movement[];
  totalBalance?: number;
  isLoading?: boolean;
}

export function MovementsList({ movements, totalBalance, isLoading }: MovementsListProps) {
  if (isLoading) {
    return <LoadingState message="Cargando movimientos..." className="p-20" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Monto</TableHead>
          <TableHead>Concepto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Usuario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements?.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell
              className={
                movement.concept === 'INCOME'
                  ? 'text-green-600 font-bold'
                  : 'text-red-600 font-bold'
              }
            >
              {movement.concept === 'INCOME' ? '+' : '-'}$
              {typeof movement.amount === 'number'
                ? movement.amount.toFixed(2)
                : parseFloat(movement.amount as any).toFixed(2)}
            </TableCell>
            <TableCell>
              {movement.concept === 'INCOME' ? 'Ingreso' : 'Egreso'}
            </TableCell>
            <TableCell>
              {new Date(movement.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}
            </TableCell>
            <TableCell>
              {movement.user?.name || 'Sistema'}
            </TableCell>
          </TableRow>
        ))}
        {movements?.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              No hay movimientos registrados
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {movements && movements.length > 0 && totalBalance !== undefined && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-bold">Total Balance:</TableCell>
            <TableCell className={`font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalBalance.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
