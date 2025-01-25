'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RentHistoryItem {
  date: string;
  rent: number;
}

interface RentHistoryChartProps {
  rentHistory: RentHistoryItem[];
}

export default function RentHistoryChart({ rentHistory }: RentHistoryChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="text-sm font-bold">{formatDate(label)}</p>
          <p className="text-sm text-blue-600">
            Rent: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rentHistory} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
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
            dataKey="rent"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Rent Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 