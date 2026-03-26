import React, { useState, useEffect } from 'react';
import { 
  Settings, Activity, Clock, RefreshCcw, 
  AlertTriangle, CheckCircle2, History 
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip as ChartTooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

// --- REUSABLE COMPONENTS (Styled for The Hive) ---

const Gauge = ({ value, label, max = 100, unit = "%" }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-hive-brown rounded-lg border border-hive-gold/20 shadow-lg">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="64" cy="64" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            className="text-hive-black"
          />
          {/* Progress Circle */}
          <circle
            cx="64" cy="64" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="text-hive-yellow transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-hive-text">{value}<span className="text-sm text-hive-gold">{unit}</span></span>
        </div>
      </div>
      <span className="text-xs font-semibold mt-4 uppercase tracking-wider text-hive-gold">{label}</span>
    </div>
  );
};

const MetricCard = ({ title, value, icon: Icon, subtitle }) => (
  <div className="bg-hive-brown p-5 rounded-lg border-l-4 border-hive-yellow shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-hive-gold uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black mt-2 text-hive-text">{value}</h3>
        {subtitle && <p className="text-xs mt-2 text-gray-400 font-medium">{subtitle}</p>}
      </div>
      <div className="p-3 rounded-lg bg-hive-black/50 border border-hive-gold/20">
        <Icon size={24} className="text-hive-yellow" />
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [noise, setNoise] = useState(72);

  // Coworker's mock data generator
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const newVib = Math.floor(Math.random() * (45 - 35) + 35);
      
      setData(prev => {
        const newData = [...prev, { time, vib: newVib, limit: 60 }];
        return newData.slice(-10); // Keep last 10 points
      });

      setNoise(Math.floor(Math.random() * (78 - 68) + 68));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const maintenanceHistory = [
    { date: '15/03/2026', type: 'Preventiva', desc: 'Troca de rolamentos eixo X', tech: 'Silva, A.' },
    { date: '02/03/2026', type: 'Corretiva', desc: 'Ajuste de tensão correia', tech: 'Santos, M.' },
    { date: '18/02/2026', type: 'Preventiva', desc: 'Lubrificação central', tech: 'Oliveira, J.' },
    { date: '05/02/2026', type: 'Preventiva', desc: 'Calibração sensores vibração', tech: 'Silva, A.' },
  ];

  // Formatting Data for Chart.js
  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: 'Nível de Vibração',
        data: data.map(d => d.vib),
        borderColor: '#FFC107', // hive-yellow
        backgroundColor: 'rgba(255, 193, 7, 0.1)', // translucent yellow fill
        fill: true,
        tension: 0.4, // smooth curves
        pointBackgroundColor: '#D4AF37',
      },
      {
        label: 'Limite Crítico',
        data: data.map(d => d.limit),
        borderColor: '#ef4444', // Red warning line
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100, grid: { color: 'rgba(212, 175, 55, 0.1)' } }, // Gold grid lines
      x: { grid: { display: false } }
    },
    plugins: {
      legend: { labels: { color: '#F0F0F0' } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-xl bg-hive-brown border border-hive-gold/30 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-hive-black rounded-xl flex items-center justify-center border border-hive-gold/50 shadow-inner">
             <Settings className="text-hive-yellow" size={32} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-hive-text uppercase tracking-wider">
              Monitoramento de Manutenção
            </h1>
            <p className="text-sm font-bold text-hive-gold tracking-widest uppercase">Setor Industrial Alpha</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Sistema Online</span>
        </div>
      </header>

      {/* Top Row: Charts and Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Chart.js Container */}
        <div className="lg:col-span-2 bg-hive-brown p-6 rounded-xl shadow-lg border border-hive-gold/20">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={20} className="text-hive-yellow" />
            <h2 className="text-lg font-bold text-hive-text">Análise de Vibração Tempo Real</h2>
          </div>
          <div className="h-64 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Gauges */}
        <div className="flex flex-col gap-6">
          <Gauge value={noise} label="Nível de Ruído Absoluto" max={120} unit=" dB" />
          
          <div className="bg-hive-brown p-6 rounded-xl shadow-lg border border-hive-gold/20 flex items-center justify-between flex-grow">
            <div>
              <h2 className="text-xs font-bold uppercase text-hive-gold mb-2 tracking-widest">Status do Núcleo</h2>
              <span className="text-3xl font-black text-hive-text">ESTÁVEL</span>
            </div>
            <CheckCircle2 size={48} className="text-green-500/80" />
          </div>
        </div>
      </div>

      {/* Middle Row: Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Horas de Operação" value="3.520 h" icon={Clock} subtitle="Desde última revisão" />
        <MetricCard title="Ciclos de Trabalho" value="1.285" icon={RefreshCcw} subtitle="Ciclos completos" />
        <MetricCard title="MTBF" value="245 hrs" icon={Activity} subtitle="Tempo Médio Entre Falhas" />
        <Gauge value={85} label="Eficiência Geral" unit="%" />
      </div>

      {/* Bottom Row: History and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-hive-brown rounded-xl shadow-lg border border-hive-gold/20 overflow-hidden">
          <div className="p-6 border-b border-hive-gold/20 bg-hive-black/30">
             <h2 className="text-lg font-bold text-hive-text flex items-center gap-2">
               <History size={20} className="text-hive-yellow" /> Registro de Ocorrências
             </h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-hive-black text-hive-gold text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {maintenanceHistory.map((item, idx) => (
                <tr key={idx} className="border-t border-hive-gold/10 hover:bg-hive-gold/5 transition-colors">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.type === 'Preventiva' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts Box */}
        <div className="bg-hive-brown p-6 rounded-xl shadow-lg border-t-4 border-red-500 border-x border-b border-x-hive-gold/20 border-b-hive-gold/20">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={24} className="text-red-500" />
            <h2 className="text-lg font-bold text-hive-text">Avisos Críticos</h2>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs font-bold tracking-widest text-red-400 mb-1">AÇÃO IMEDIATA</p>
            <p className="text-sm text-white">Substituição de Óleo Lubrificante - Eixo Principal</p>
          </div>
        </div>

      </div>
    </div>
  );
}