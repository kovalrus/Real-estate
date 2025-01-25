'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  landValue: number;
  structureValue: number;
  totalValue: number;
}

interface TaxAssessmentChartProps {
  data: ChartData[];
}

export default function TaxAssessmentChart({ data }: TaxAssessmentChartProps) {
  console.log('Chart received data:', data);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="text-sm font-bold">{label}</p>
          <p className="text-sm text-blue-600">Land: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-green-600">Structure: {formatCurrency(payload[1].value)}</p>
          <p className="text-sm text-purple-600">Total: {formatCurrency(payload[2].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
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
            dataKey="landValue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Land Value"
          />
          <Line
            type="monotone"
            dataKey="structureValue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Structure Value"
          />
          <Line
            type="monotone"
            dataKey="totalValue"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Total Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 