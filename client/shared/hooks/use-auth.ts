import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export const useAuth = () => {
  const session = authClient.useSession();

  return {
    data: session.data,
    isPending: session.isPending,
    error: session.error,
    isAuthenticated: !!session.data?.session,
    user: session.data?.user,
    role: (session.data?.user as any)?.role as
      | 'ADMIN'
      | 'USER'
      | undefined,
  };
};

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginWithGithub = async () => {
    setIsLoggingIn(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
    } catch (error) {
      setIsLoggingIn(false);
      throw error;
    }
  };

  return {
    isLoggingIn,
    loginWithGithub,
    signOut: authClient.signOut,
  };
};
