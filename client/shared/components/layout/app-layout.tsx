import { ReactNode, useState } from 'react';
import Sidebar from './sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/client/shared/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50 lg:hidden">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src="/prevalentWare.webp"
            alt="PrevalentWare Logo"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <span className="font-bold text-lg tracking-tight text-slate-900 truncate">
            PrevalentWare
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Content Area */}
      <main className="lg:pl-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
