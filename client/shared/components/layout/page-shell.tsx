import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

const PageShell = ({ children, className }: PageShellProps) => {
  return (
    <div className={cn("space-y-8 animate-in fade-in duration-500", className)}>
      {children}
    </div>
  );
};

export default PageShell;
