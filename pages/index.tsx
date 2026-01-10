import Link from 'next/link';
import { Button } from '@/client/shared/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/client/shared/components/ui/card';
import { authClient } from '@/lib/auth/client';

const Home = () => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 from-slate-100 to-slate-200'>
    <div className='max-w-3xl text-center space-y-8 p-8'>
      <h1 className='text-5xl font-extrabold tracking-tight text-slate-900'>
        PrevalentWare Fullstack Test
      </h1>
      <p className='text-xl text-slate-600'>
        Sistema de gestión financiera con autenticación y reportes.
      </p>

      <div className='flex justify-center gap-4'>
        <Button
          variant='outline'
          size='lg'
          onClick={() => authClient.signOut()}
        >
          Cerrar Sesión
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left'>
        <Link href='/movements'>
          <Card>
            <CardHeader>
              <CardTitle>Movimientos</CardTitle>
              <CardDescription>
                Gestiona tus ingresos y egresos.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href='/users'>
          <Card>
            <CardHeader>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>Administra roles y permisos.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href='/reports'>
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Visualiza el estado financiero.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
