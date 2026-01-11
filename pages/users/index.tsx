import { Card, CardContent } from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useUsers } from '@/client/features/users/hooks/use-users';
import { UsersList } from '@/client/features/users/components/users-list';
import AppLayout from '@/client/shared/components/layout/app-layout';
import type { ReactElement } from 'react';

import PageShell from '@/client/shared/components/layout/page-shell';
import PageHeader from '@/client/shared/components/layout/page-header';

import { LoadingState } from '@/client/shared/components/ui/loading-state';

const UsersPage = () => {
  const { isPending: authLoading } = useAuth();
  const { users, isLoading: usersLoading, mutate } = useUsers();

  if (authLoading || usersLoading) {
    return (
      <PageShell>
        <LoadingState message='Cargando usuarios...' />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        title='Gestión de Usuarios'
        description='Administra los roles y estados de acceso de los usuarios del sistema.'
      />

      <Card className='border-slate-200 overflow-hidden shadow-sm'>
        <CardContent className='p-0'>
          <UsersList
            users={users}
            isLoading={usersLoading}
            onUserUpdated={() => mutate()}
          />
        </CardContent>
      </Card>
    </PageShell>
  );
};

UsersPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default UsersPage;
