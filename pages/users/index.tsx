import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useUsers } from '@/client/features/users/hooks/use-users';
import { UsersList } from '@/client/features/users/components/users-list';
import AppLayout from '@/client/shared/components/layout/app-layout';
import type { ReactElement } from 'react';

const UsersPage = () => {
  const { isPending: authLoading } = useAuth();
  const { users, isLoading: usersLoading, mutate } = useUsers();

  if (authLoading || usersLoading) {
    return (
      <div className='flex items-center justify-center p-12'>
        <p className='text-lg text-slate-500 animate-pulse'>
          Cargando usuarios...
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Usuarios
        </h1>
        <p className='text-slate-500'>
          Administra los roles y estados de los usuarios.
        </p>
      </div>

      <Card className='border-slate-200'>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersList
            users={users}
            isLoading={usersLoading}
            onUserUpdated={() => mutate()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

UsersPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default UsersPage;
