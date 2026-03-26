import React from 'react';
import { Power, Zap, ShieldAlert, Thermometer, Droplets, Wind } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import Hexagon from '../components/Hexagon';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CONTROL_ACTIONS = [
  { id: 'pwr', label: 'Core Power', icon: Zap, color: 'border-yellow-500', active: true },
  { id: 'cool', label: 'Cooling', icon: Thermometer, color: 'border-blue-500', active: true },
  { id: 'vent', label: 'Ventilation', icon: Wind, color: 'border-green-500', active: false },
  { id: 'sec', label: 'Security', icon: ShieldAlert, color: 'border-red-500', active: true },
];

export default function Control() {
  const radarData = {
    labels: ['Energy', 'CPU', 'Thermal', 'Network', 'Stability', 'Load'],
    datasets: [{
      label: 'System Output',
      data: [80, 90, 60, 70, 95, 50],
      backgroundColor: 'rgba(255, 193, 7, 0.2)',
      borderColor: '#ffc107',
      borderWidth: 2,
      pointBackgroundColor: '#ffc107',
    }]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#e0e0e0', font: { size: 12 } },
        ticks: { display: false }
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="min-h-screen bg-hive-black text-hive-text p-8 pt-24">
      <header className="mb-12 border-l-4 border-hive-yellow pl-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">System Control</h1>
        <p className="text-hive-yellow opacity-60 tracking-[0.3em] text-xs">Manual Override & Resource Allocation</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Tactical Hex Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {CONTROL_ACTIONS.map((action) => (
            <div key={action.id} className="cursor-pointer">
              <Hexagon 
                className="w-40 h-[175px]" 
                borderClassName={action.active ? "bg-hive-yellow shadow-[0_0_15px_rgba(255,193,7,0.4)]" : "bg-hive-brown opacity-50"}
                innerClassName="bg-[#151515] hover:bg-hive-yellow group"
              >
                <action.icon className={`w-8 h-8 mb-2 ${action.active ? 'text-hive-yellow' : 'text-hive-brown'} group-hover:text-hive-black transition-colors`} />
                <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-hive-black">
                  {action.label}
                </span>
                <div className={`mt-2 h-1 w-8 ${action.active ? 'bg-hive-yellow' : 'bg-transparent'} group-hover:bg-hive-black`} />
              </Hexagon>
            </div>
          ))}
        </div>

        {/* Right: Resource Radar */}
        <div className="bg-[#121212] p-8 border border-hive-brown rounded-sm relative overflow-hidden">
            {/* Industrial corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hive-yellow" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hive-yellow" />
            
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.4em] mb-8">Resource Distribution</h2>
            <div className="h-[400px] flex items-center justify-center">
              <Radar data={radarData} options={radarOptions} />
            </div>
        </div>

      </div>

      {/* Footer Emergency Kill Switch */}
      <footer className="mt-16 flex justify-end">
        <button className="flex items-center gap-4 bg-red-900/20 border border-red-600 text-red-500 px-8 py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
          <Power className="w-5 h-5" />
          Emergency Scram
        </button>
      </footer>
    </div>
  );
}