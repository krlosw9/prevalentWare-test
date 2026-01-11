import { GetServerSideProps } from 'next';
import { Github, Loader2 } from 'lucide-react';
import { useLogin } from '@/client/shared/hooks/use-auth';
import { auth } from '@/lib/auth';
import { Button } from '@/client/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/client/shared/components/ui/card';

const SignIn = () => {
  const { loginWithGithub, isLoggingIn } = useLogin();

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
            <Button
              className='w-full'
              onClick={loginWithGithub}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Github className='mr-2 h-4 w-4' />
              )}
              {isLoggingIn ? 'Cargando...' : 'Continuar con GitHub'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth.api.getSession({
    headers: new Headers(ctx.req.headers as Record<string, string>),
  });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignIn;
