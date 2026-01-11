/**
 * Formulario de creación de movimientos
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/client/shared/components/ui/button';
import { Input } from '@/client/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/client/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/client/shared/components/ui/select';
import { useMovementForm } from '../hooks/use-movement-form';
import type { MovementConcept } from '../types/movement.types';

const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El monto debe ser un número positivo",
  }),
  concept: z.enum(['INCOME', 'EXPENSE'], {
    message: 'El concepto debe ser INCOME o EXPENSE',
  }),
  date: z.string().min(1, "La fecha es obligatoria"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateMovementFormProps {
  onSuccess?: () => void;
}

export function CreateMovementForm({ onSuccess }: CreateMovementFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      concept: 'EXPENSE',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const { handleSubmit: submitToServer, isSubmitting } = useMovementForm({
    onSuccess: () => {
      form.reset();
      onSuccess?.();
      toast.success('Movimiento creado con éxito');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: FormValues) => {
    await submitToServer({
      concept: values.concept as MovementConcept,
      amount: parseFloat(values.amount),
      date: `${values.date}T00:00:00.000Z`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="100"
                  placeholder="100"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="concept"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concepto</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione concepto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INCOME">Ingreso</SelectItem>
                  <SelectItem value="EXPENSE">Egreso</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </Form>
  );
}
