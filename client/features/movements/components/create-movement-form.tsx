/**
 * Formulario de creación de movimientos
 */

import { useState } from 'react';
import { Button } from '@/client/shared/components/ui/button';
import { Input } from '@/client/shared/components/ui/input';
import { Label } from '@/client/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/client/shared/components/ui/select';
import { useMovementForm } from '../hooks/use-movement-form';
import type { MovementConcept } from '../types/movement.types';

interface CreateMovementFormProps {
  onSuccess?: () => void;
}

export function CreateMovementForm({ onSuccess }: CreateMovementFormProps) {
  const [concept, setConcept] = useState<MovementConcept>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const { handleSubmit, isSubmitting } = useMovementForm({
    onSuccess: () => {
      resetForm();
      onSuccess?.();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const resetForm = () => {
    setConcept('EXPENSE');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmit({
      concept,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="concept">Concepto</Label>
        <Select value={concept} onValueChange={(value) => setConcept(value as MovementConcept)} disabled={isSubmitting}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione concepto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Ingreso</SelectItem>
            <SelectItem value="EXPENSE">Egreso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Fecha</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  );
}
