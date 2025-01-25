'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PriceHistoryChartProps {
  priceHistory: Array<{
    date: string;
    price: number;
    event: string;
  }>;
}

export default function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
  const sortedHistory = [...priceHistory].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="text-sm text-gray-600">{formatDate(data.date)}</p>
          <p className="font-bold">{formatCurrency(data.price)}</p>
          <p className="text-sm text-gray-600">{data.event}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedHistory} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 