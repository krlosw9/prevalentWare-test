/**
 * Componente de lista de usuarios
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/client/shared/components/ui/table';
import { Button } from '@/client/shared/components/ui/button';
import { Pencil } from 'lucide-react';
import type { User } from '../types/user.types';
import { useState } from 'react';
import { EditUserForm } from './edit-user-form';

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  onUserUpdated: () => void;
}

export function UsersList({ users, isLoading, onUserUpdated }: UsersListProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (isLoading) {
    return <div className="p-8 text-center">Cargando usuarios...</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone || 'No registrado'}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingUser(user)}
                  title="Editar usuario"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No hay usuarios registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editingUser && (
        <EditUserForm
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null);
            onUserUpdated();
          }}
        />
      )}
    </>
  );
}
