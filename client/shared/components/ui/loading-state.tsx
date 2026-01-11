import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Cargando...",
  className = "p-12"
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center w-full min-h-[200px] space-y-4 ${className}`}>
      <div className="relative">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <div className="absolute inset-0 w-10 h-10 border-4 border-blue-600/10 rounded-full" />
      </div>
      <p className="text-slate-500 font-medium animate-pulse tracking-wide">
        {message}
      </p>
    </div>
  );
}
