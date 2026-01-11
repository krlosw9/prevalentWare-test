import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/client/shared/components/ui/card';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const isPositive = balance >= 0;
  return (
    <Card className='bg-slate-50'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-slate-500'>
          Saldo Actual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
        >
          ${balance.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};
