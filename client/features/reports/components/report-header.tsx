import Link from 'next/link';
import { Button } from '@/client/shared/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';

interface ReportHeaderProps {
  onExport: () => void;
  isExporting: boolean;
}

export const ReportHeader = ({ onExport, isExporting }: ReportHeaderProps) => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-4'>
      <Link href='/'>
        <Button variant='ghost' size='icon'>
          <ArrowLeft className='h-4 w-4' />
        </Button>
      </Link>
      <h1 className='text-3xl font-bold tracking-tight'>Reportes</h1>
    </div>

    <Button onClick={onExport} disabled={isExporting} className='gap-2'>
      <Download className='h-4 w-4' />
      {isExporting ? 'Exportando...' : 'Descargar CSV'}
    </Button>
  </div>
);
