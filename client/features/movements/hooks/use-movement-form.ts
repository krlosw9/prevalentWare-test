/**
 * Hook para manejar la lógica del formulario de creación de movimientos
 */

import { useState } from 'react';
import { MovementService } from '../services/movement.service';
import type { CreateMovementDTO } from '../types/movement.types';

interface UseMovementFormOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useMovementForm(options: UseMovementFormOptions = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (data: CreateMovementDTO) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await MovementService.create(data);
      options.onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al crear movimiento');
      setError(error);
      options.onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error,
  };
}
