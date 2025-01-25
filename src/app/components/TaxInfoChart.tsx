'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaxHistoryItem {
  time: number;
  taxPaid: number;
  value: number | null;
  taxIncreaseRate: number;
  valueIncreaseRate: number;
}

interface TaxInfoChartProps {
  taxHistory: TaxHistoryItem[];
}

export default function TaxInfoChart({ taxHistory }: TaxInfoChartProps) {
  const sortedHistory = [...taxHistory].sort((a, b) => a.time - b.time);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).getFullYear();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="text-sm font-bold">Year: {formatDate(label)}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: {formatCurrency(item.value)}
            </p>
          ))}
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
            dataKey="time"
            height={40}
            tickFormatter={formatDate}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="taxPaid"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Tax Paid"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Property Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 