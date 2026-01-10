/**
 * Componente de formulario para editar usuario
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/client/shared/components/ui/dialog';
import { Button } from '@/client/shared/components/ui/button';
import { Input } from '@/client/shared/components/ui/input';
import { Label } from '@/client/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/client/shared/components/ui/select';
import { useUsers } from '../hooks/use-users';
import type { User, UserRole } from '../types/user.types';

interface EditUserFormProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserForm({ user, open, onClose, onSuccess }: EditUserFormProps) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<UserRole>(user.role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { updateUser } = useUsers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!name.trim()) {
        throw new Error('El nombre es obligatorio');
      }
      
      await updateUser(user.id, name, role);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del usuario"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Usuario</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
