import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  ArrowLeftRight,
  Users,
  BarChart3,
  LogOut,
  X
} from 'lucide-react';
import { useAuth, useLogin } from '@/client/shared/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Button } from '@/client/shared/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const { role, user } = useAuth();
  const { signOut } = useLogin();

  const menuItems = [
    { label: 'Inicio', icon: Home, href: '/', roles: ['ADMIN', 'USER'] },
    { label: 'Movimientos', icon: ArrowLeftRight, href: '/movements', roles: ['ADMIN', 'USER'] },
    { label: 'Usuarios', icon: Users, href: '/users', roles: ['ADMIN'] },
    { label: 'Reportes', icon: BarChart3, href: '/reports', roles: ['ADMIN'] },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-slate-950 text-slate-200 border-r border-slate-800 flex flex-col z-[60] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand/Logo */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/prevalentWare.webp"
              alt="PrevalentWare Logo"
              className="w-8 h-8 object-contain flex-shrink-0"
            />
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
              PrevalentWare
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400 hover:bg-slate-900 ml-2 flex-shrink-0"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            if (item.roles && !item.roles.includes(role || '')) return null;

            const isActive = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-blue-600/10 text-blue-400 font-medium"
                    : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-blue-400" : "group-hover:text-slate-200"
                )} />
                <span>{item.label}</span>

                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Sign Out */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate">{user?.name}</span>
              <span className="text-xs text-slate-500 truncate">{role}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl px-4"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
