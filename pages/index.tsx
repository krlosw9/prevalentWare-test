import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/client/shared/components/ui/card';
import { useAuth } from '@/client/shared/hooks/use-auth';
import AppLayout from '@/client/shared/components/layout/app-layout';
import type { ReactElement } from 'react';

const Home = () => {
  const { role } = useAuth();

  return (
    <div className='max-w-4xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Bienvenido
        </h1>
        <p className='text-slate-500'>
          Sistema de gestión financiera de PrevalentWare.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Link
          href='/movements'
          className='transition-transform hover:scale-[1.02]'
        >
          <Card className='h-full border-slate-200'>
            <CardHeader>
              <CardTitle className='text-xl'>Movimientos</CardTitle>
              <CardDescription>
                Gestiona tus ingresos y egresos.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        {role === 'ADMIN' && (
          <Link
            href='/users'
            className='transition-transform hover:scale-[1.02]'
          >
            <Card className='h-full border-slate-200'>
              <CardHeader>
                <CardTitle className='text-xl'>Usuarios</CardTitle>
                <CardDescription>Administra roles y permisos.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
        {role === 'ADMIN' && (
          <Link
            href='/reports'
            className='transition-transform hover:scale-[1.02]'
          >
            <Card className='h-full border-slate-200'>
              <CardHeader>
                <CardTitle className='text-xl'>Reportes</CardTitle>
                <CardDescription>
                  Visualiza el estado financiero.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Home;
