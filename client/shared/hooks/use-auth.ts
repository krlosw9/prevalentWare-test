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
  return {
    signIn: authClient.signIn.social,
    signOut: authClient.signOut,
  }
}
