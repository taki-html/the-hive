import React from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip as ChartTooltip, Legend, 
  Filler, BarElement 
} from 'chart.js';

import { useHiveData } from '../hooks/useHiveData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend, Filler);

export default function Dashboard() {
  const { data: machines, loading, error, refetch } = useHiveData();

  // Protect against undefined data while loading
  const safeMachines = machines || [];

  const chartData = {
    // FIXED: Mapped to the correct JSON key 'nome_modelo'
    labels: safeMachines.map(m => m.nome_modelo),
    datasets: [
      {
        type: 'bar',
        label: 'Média de Ruído (dB)',
        // Parsed as float to ensure Chart.js handles it properly
        data: safeMachines.map(m => parseFloat(m.media_db)),
        backgroundColor: safeMachines.map(m => 
          m.status_alerta === 'CRITICO' ? 'rgba(239, 68, 68, 0.8)' : 
          m.status_alerta === 'MANUTENCAO' ? 'rgba(249, 115, 22, 0.8)' : 
          'rgba(255, 193, 7, 0.8)' 
        ),
        borderColor: '#111111',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Vezes Ligada',
        // Integrating the new metric as a secondary overlay
        data: safeMachines.map(m => parseInt(m.vezes_ligada, 10)),
        borderColor: '#D4AF37', // Hive Gold
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#D4AF37',
        tension: 0.3,
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        type: 'linear',
        display: true,
        position: 'left',
        min: 0, 
        max: 120, 
        title: { display: true, text: 'Ruído (dB)', color: '#F0F0F0' },
        grid: { color: 'rgba(212, 175, 55, 0.1)' } 
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Vezes Ligada', color: '#F0F0F0' },
        grid: { drawOnChartArea: false } // Prevents overlapping grid lines
      },
      x: { grid: { display: false } }
    },
    plugins: {
      legend: { labels: { color: '#F0F0F0' } },
      tooltip: { mode: 'index', intersect: false }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hive-text">System Dashboard</h1>
        
        <button 
          onClick={refetch}
          disabled={loading}
          className="flex items-center gap-2 bg-hive-brown text-hive-yellow px-4 py-2 rounded-md hover:bg-opacity-80 transition-all disabled:opacity-50"
        >
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} /> 
          {loading ? 'Syncing...' : 'Sync Data'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-md flex items-center gap-3 mb-6">
          <AlertTriangle size={24} />
          <p><strong>Connection Error:</strong> {error}</p>
        </div>
      )}

      {loading && safeMachines.length === 0 && !error ? (
        <div className="flex justify-center items-center h-64 text-hive-yellow">
           <RefreshCcw size={32} className="animate-spin" />
           <span className="ml-3">Establishing connection to the Hive...</span>
        </div>
      ) : (
        <div className="h-96 w-full bg-hive-black border border-hive-brown rounded-lg p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}