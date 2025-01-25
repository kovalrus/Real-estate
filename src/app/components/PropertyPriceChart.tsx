'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceHistoryItem {
  date: string;
  price: number;
  event: string;
}

interface PropertyPriceChartProps {
  priceHistory: PriceHistoryItem[];
}

export default function PropertyPriceChart({ priceHistory }: PropertyPriceChartProps) {
  const sortedHistory = [...priceHistory].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data: ChartData<'line'> = {
    labels: sortedHistory.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Property Price History',
        data: sortedHistory.map(item => item.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            const index = context.dataIndex;
            const event = sortedHistory[index].event;
            const price = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(context.parsed.y);
            return [`Price: ${price}`, `Event: ${event}`];
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: false,
        ticks: {
          callback: function(value: number | string) {
            if (typeof value === 'number') {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(value);
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
} 