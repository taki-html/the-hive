import React from 'react';
import { Settings, Activity, Power, AlertTriangle, CheckCircle2, Database, Volume2, RefreshCcw } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useHiveData } from '../hooks/useHiveData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

const Gauge = ({ value, label, max = 100, unit = "%" }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-hive-brown rounded-lg border border-hive-gold/20 shadow-lg">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-hive-black" />
          <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" className="text-hive-yellow transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-hive-text">{value}<span className="text-sm text-hive-gold">{unit}</span></span>
        </div>
      </div>
      <span className="text-xs font-semibold mt-4 uppercase tracking-wider text-hive-gold text-center">{label}</span>
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

export default function Dashboard() {
  // Pulling live data and network states from our custom hook
  const { data, loading, error, refetch } = useHiveData();

  // --- 1. LOADING STATE ---
  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-hive-gold">
        <RefreshCcw size={48} className="animate-spin mb-4" />
        <h2 className="text-xl font-bold tracking-widest uppercase">Conectando ao banco...</h2>
        <p className="text-gray-400 mt-2 text-sm">Aguardando resposta da API na Render</p>
      </div>
    );
  }

  // --- 2. ERROR STATE ---
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-red-500">
        <AlertTriangle size={48} className="mb-4" />
        <h2 className="text-xl font-bold uppercase tracking-widest">Erro de Conexão</h2>
        <p className="text-gray-400 mt-2 font-mono text-sm bg-hive-black p-4 rounded mt-4">{error}</p>
        <button 
          onClick={refetch} 
          className="mt-6 px-6 py-2 bg-hive-yellow text-hive-black font-bold rounded hover:bg-hive-gold transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={18} /> Tentar Novamente
        </button>
      </div>
    );
  }

  // Safety check before rendering
  // Safety check before rendering - DEBUG MODE
  if (!data || !data.estado_maquina || !data.tabela_bruta) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-hive-text p-8">
        <AlertTriangle size={48} className="text-hive-yellow mb-4" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-red-400">Payload Mismatch</h2>
        <p className="text-gray-400 mt-2 text-center max-w-lg mb-6">
          A API conectou com sucesso, mas o formato do JSON está diferente do esperado. 
          Aqui está exatamente o que o backend da Karol está enviando:
        </p>
        <div className="bg-black/80 border border-hive-gold/30 p-6 rounded-lg w-full max-w-2xl overflow-auto text-left">
          <pre className="text-green-400 font-mono text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // --- 3. DATA MAPPING ---
  const estadoMaquina = data.estado_maquina;
  // The API sends newest first (DESC), but the chart needs to draw oldest to newest (left to right)
  const chartTableData = [...data.tabela_bruta].reverse(); 
  // Get the absolute newest reading for the Gauge
  const ultimoDb = data.tabela_bruta.length > 0 ? data.tabela_bruta[0].valor_db : 0;

  // --- 4. CHART CONFIGURATION ---
  const chartData = {
    labels: chartTableData.map(d => {
      // Formats full timestamp to just "HH:MM:SS" for cleaner labels
      const date = new Date(d.data_hora);
      return date.toLocaleTimeString([], { hour12: false });
    }),
    datasets: [
      {
        label: 'Ruído Detectado (dB)',
        data: chartTableData.map(d => d.valor_db),
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#D4AF37',
      },
      {
        label: 'Limite Crítico',
        data: chartTableData.map(() => estadoMaquina.limite_db_critico),
        borderColor: '#ef4444',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Limite Manutenção',
        data: chartTableData.map(() => estadoMaquina.limite_db_manutencao),
        borderColor: '#eab308',
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
      y: { min: 40, max: 100, grid: { color: 'rgba(212, 175, 55, 0.1)' } },
      x: { grid: { display: false } }
    },
    plugins: { legend: { labels: { color: '#F0F0F0' } } }
  };

  // --- 5. RENDER UI ---
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-xl bg-hive-brown border border-hive-gold/30 shadow-xl gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 bg-hive-black rounded-xl flex items-center justify-center border border-hive-gold/50 shadow-inner shrink-0">
            <Settings className="text-hive-yellow" size={32} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-hive-text uppercase tracking-wider">
              {estadoMaquina.nome}
            </h1>
            <p className="text-sm font-bold text-hive-gold tracking-widest uppercase">ID Máquina: {estadoMaquina.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={refetch}
            disabled={loading}
            className="px-4 py-2 bg-hive-black/50 border border-hive-gold/30 text-hive-gold rounded font-bold uppercase tracking-wider text-xs hover:bg-hive-gold/10 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
            Sync
          </button>
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Sistema Online</span>
          </div>
        </div>
      </header>

      {/* TOP ROW: Gráfico e Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-hive-brown p-6 rounded-xl shadow-lg border border-hive-gold/20">
          <div className="flex items-center gap-2 mb-6">
            <Volume2 size={20} className="text-hive-yellow" />
            <h2 className="text-lg font-bold text-hive-text">Nível de Ruído Sonoro (Tempo Real)</h2>
          </div>
          <div className="h-64 md:h-80 w-full relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Gauge value={ultimoDb} label="Ruído Atual" max={120} unit=" dB" />
          
          <div className="bg-hive-brown p-6 rounded-xl shadow-lg border border-hive-gold/20 flex items-center justify-between flex-grow">
            <div>
              <h2 className="text-xs font-bold uppercase text-hive-gold mb-2 tracking-widest">Status</h2>
              <span className={`text-2xl font-black ${
                  estadoMaquina.status_alerta === "CRITICO" ? "text-red-500" : 
                  estadoMaquina.status_alerta === "MANUTENCAO" ? "text-yellow-400" : "text-green-500"
                }`}>
                {estadoMaquina.status_alerta}
              </span>
            </div>
            {estadoMaquina.status_alerta === "CRITICO" ? (
              <AlertTriangle size={48} className="text-red-500" />
            ) : estadoMaquina.status_alerta === "MANUTENCAO" ? (
              <AlertTriangle size={48} className="text-yellow-400" />
            ) : (
              <CheckCircle2 size={48} className="text-green-500/80" />
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Acionamentos" 
          value={estadoMaquina.vezes_ligada} 
          icon={Power} 
          subtitle="Ciclos de operação registrados" 
        />
        <MetricCard 
          title="Média Sonora" 
          value={`${parseFloat(estadoMaquina.media_db).toFixed(2)} dB`} 
          icon={Activity} 
          subtitle="Média histórica acumulada" 
        />
        <MetricCard 
          title="Alerta Manutenção" 
          value={`${estadoMaquina.limite_db_manutencao} dB`} 
          icon={Settings} 
          subtitle="Gatilho de revisão preventiva" 
        />
        <MetricCard 
          title="Alerta Crítico" 
          value={`${estadoMaquina.limite_db_critico} dB`} 
          icon={AlertTriangle} 
          subtitle="Gatilho de parada imediata" 
        />
      </div>

      {/* BOTTOM ROW: Log Bruto da Tabela */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabela Bruta */}
        <div className="lg:col-span-2 bg-hive-brown rounded-xl shadow-lg border border-hive-gold/20 overflow-hidden">
          <div className="p-6 border-b border-hive-gold/20 bg-hive-black/30 flex justify-between items-center">
            <h2 className="text-lg font-bold text-hive-text flex items-center gap-2">
              <Database size={20} className="text-hive-yellow" /> Log da Tabela Bruta
            </h2>
            {loading && <RefreshCcw size={14} className="text-hive-gold animate-spin" />}
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-center min-w-[600px]">
              <thead className="bg-hive-black text-hive-gold text-xs uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Data/Hora</th>
                  <th className="px-6 py-4">Valor (dB)</th>
                  <th className="px-6 py-4">Status Motor</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                {data.tabela_bruta.map((item) => (
                  <tr key={item.id} className="border-t border-hive-gold/10 hover:bg-hive-gold/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.data_hora).toLocaleTimeString([], { hour12: false })}
                    </td>
                    <td className={`px-6 py-4 font-bold ${item.valor_db >= estadoMaquina.limite_db_critico ? 'text-red-400' : 'text-hive-yellow'}`}>
                      {item.valor_db} dB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${item.status_ligado === 1 ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {item.status_ligado === 1 ? 'LIGADO' : 'DESLIGADO'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerta Baseado no Banco */}
        <div className={`bg-hive-brown p-6 rounded-xl shadow-lg border-t-4 border-x border-b border-x-hive-gold/20 border-b-hive-gold/20 ${estadoMaquina.status_alerta === 'CRITICO' ? 'border-t-red-500' : estadoMaquina.status_alerta === 'MANUTENCAO' ? 'border-t-yellow-400' : 'border-t-green-500'}`}>
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={24} className={estadoMaquina.status_alerta === 'CRITICO' ? 'text-red-500' : estadoMaquina.status_alerta === 'MANUTENCAO' ? 'text-yellow-400' : 'text-green-500'} />
            <h2 className="text-lg font-bold text-hive-text">Regra de Negócio</h2>
          </div>
          
          <div className="p-4 bg-hive-black/30 border border-hive-gold/10 rounded-lg text-sm text-gray-300">
            <p className="mb-4">O painel analisa a média móvel de ruído atual comparando com os limites estabelecidos previamente.</p>
            
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-hive-gold/10 pb-1">
                <span>Média Registrada:</span> <strong className="text-white">{estadoMaquina.media_db} dB</strong>
              </li>
              <li className="flex justify-between border-b border-hive-gold/10 pb-1">
                <span>Gatilho Crítico:</span> <strong className="text-red-400">{'>= '} {estadoMaquina.limite_db_critico} dB</strong>
              </li>
            </ul>

            {estadoMaquina.status_alerta === 'CRITICO' && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-100 text-xs font-bold tracking-wider">
                MÉDIA ULTRAPASSOU O LIMITE CRÍTICO DE {estadoMaquina.limite_db_critico}dB.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}