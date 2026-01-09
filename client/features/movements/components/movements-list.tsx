/**
 * Componente de lista de movimientos
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/client/shared/components/ui/table';
import type { Movement } from '../types/movement.types';

interface MovementsListProps {
  movements?: Movement[];
  isLoading?: boolean;
}

export function MovementsList({ movements, isLoading }: MovementsListProps) {
  if (isLoading) {
    return <div className="p-8">Cargando movimientos...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Monto</TableHead>
          <TableHead>Concepto</TableHead>
          <TableHead>Fecha</TableHead>
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
              {new Date(movement.date).toLocaleDateString()}
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
    </Table>
  );
}
