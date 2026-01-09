import { Github } from 'lucide-react';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/client/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/client/shared/components/ui/card';

export default function SignIn() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Sistema de Gestión de Ingresos y Egresos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <Button className='w-full' onClick={handleLogin}>
              <Github className='mr-2 h-4 w-4' />
              Continuar con GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
