import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/client/shared/components/ui/card';
import type { ChartDataItem } from '../types/report.types';

interface FinancialChartProps {
  data: ChartDataItem[];
}

export function FinancialChart({ data }: FinancialChartProps) {
  // Formatear fechas para mejor visualización
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    }),
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Evolución de Ingresos vs Egresos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, '']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                name="Ingreso"
                dataKey="income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Egreso"
                dataKey="expense"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
