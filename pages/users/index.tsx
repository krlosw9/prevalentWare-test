import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import { useUsers } from '@/client/features/users/hooks/use-users';
import { UsersList } from '@/client/features/users/components/users-list';
import Link from 'next/link';
import { Button } from '@/client/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const UsersPage = () => {
  const { isPending: authLoading } = useAuth();
  const { users, isLoading: usersLoading, mutate } = useUsers();

  if (authLoading || usersLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg'>Cargando...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-10 px-4 space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-3xl font-bold tracking-tight'>Inicio</h1>
      </div>

      <Card>
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

export default UsersPage;
