import { NextApiRequest, NextApiResponse } from 'next';

import { fromNodeHeaders } from 'better-auth/node';
import { auth, Session } from '@/lib/auth';

type AuthenticatedHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => Promise<void> | void;

export function withAuth(handler: AuthenticatedHandler, requiredRole?: 'ADMIN' | 'USER') {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    if (requiredRole && session.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Prohibido: No tienes permiso para realizar esta accion' });
    }

    // Llama al handler con la session injectada
    return handler(req, res, session);
  };
}
